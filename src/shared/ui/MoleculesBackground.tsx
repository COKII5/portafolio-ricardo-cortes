import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const LINK_DISTANCE = 130;
const POINTER_DISTANCE = 170;
const MAX_SPEED = 0.35;

function createParticles(width: number, height: number): Particle[] {
  // Densidad según el área, con tope bajo en pantallas chicas para cuidar el rendimiento en celulares
  const count = Math.round(Math.min(width < 640 ? 28 : 70, (width * height) / 14000));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2 * MAX_SPEED,
    vy: (Math.random() - 0.5) * 2 * MAX_SPEED,
    radius: 1.2 + Math.random() * 1.6,
  }));
}

// Fondo fijo de "moléculas" para todo el sitio: puntos que flotan y se unen con líneas. Decorativo: aria-hidden y sin eventos
export function MoleculesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let pointer: { x: number; y: number } | null = null;
    // El color sale del token --accent-fg (vía text-accent-fg del canvas) y se relee al cambiar el tema
    let color = getComputedStyle(canvas).color;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.strokeStyle = color;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < LINK_DISTANCE) {
            context.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.25;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
        if (pointer) {
          const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (distance < POINTER_DISTANCE) {
            context.globalAlpha = (1 - distance / POINTER_DISTANCE) * 0.5;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(pointer.x, pointer.y);
            context.stroke();
          }
        }
        context.globalAlpha = 0.5;
        context.beginPath();
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const step = () => {
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }
      draw();
      frameId = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      if (reducedMotion) draw();
      else if (!document.hidden) frameId = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height);
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      color = getComputedStyle(canvas).color;
      if (reducedMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const handleVisibility = () => (document.hidden ? cancelAnimationFrame(frameId) : start());
    document.addEventListener('visibilitychange', handleVisibility);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    };
    if (finePointer && !reducedMotion) window.addEventListener('pointermove', handlePointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // fixed + -z-10 dentro del contenedor "isolate" del layout: queda detrás de todo el contenido y quieto al hacer scroll
      className="pointer-events-none fixed inset-0 -z-10 size-full text-accent-fg"
    />
  );
}
