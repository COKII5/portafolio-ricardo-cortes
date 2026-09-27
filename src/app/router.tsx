import { createBrowserRouter } from 'react-router';
import { HomePage } from '../features/home/pages/HomePage';
import { NotFound } from '../shared/ui/NotFound';
import { RootLayout } from './layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // Se muestra solo en la carga directa de una ruta lazy, mientras llega su chunk (milisegundos)
    hydrateFallbackElement: <div className="min-h-dvh" />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'trabajos/:slug',
        // El detalle se descarga solo al visitarlo: la home no carga su código
        lazy: async () => {
          const { WorkDetailPage } = await import('../features/works/pages/WorkDetailPage');
          return { Component: WorkDetailPage };
        },
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
