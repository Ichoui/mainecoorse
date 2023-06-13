import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Articles } from "@app/articles/articles";
import { Calendar } from "@app/calendar/calendar";
import { Recettes } from "@app/recettes/recettes";
import { Courses } from "@app/courses/courses";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => console.clear());
}

// https://github.com/remix-run/react-router/tree/dev/examples
// value='/calendar'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        Component: Calendar,
      },
      {
        path: 'calendar',
        Component: Calendar,
      },
      {
        path: 'articles',
        Component: Articles,
      },
      {
        path: 'recettes',
        Component: Recettes,
      },
      {
        path: 'courses',
        Component: Courses,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
