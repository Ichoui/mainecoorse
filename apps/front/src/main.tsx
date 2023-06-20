import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Articles } from '@app/articles/articles';
import { Calendar } from '@app/calendar/calendar';
import { Recettes } from '@app/recettes/recettes';
import { Courses } from '@app/courses/courses';
import { EditArticle } from '@app/articles/editArticle/editArticle';
import { Notes } from '@app/notes/notes';
import { EditRecette } from '@app/recettes/editRecette/editRecette';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => console.clear());
}

// https://github.com/remix-run/react-router/tree/dev/examples
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/articles' replace />,
      },
      {
        path: 'articles',
        Component: Articles,
      },
      {
        path: 'calendar',
        Component: Calendar,
      },
      {
        path: 'recettes',
        Component: Recettes,
      },
      {
        path: 'courses',
        Component: Courses,
      },
      {
        path: 'notes',
        Component: Notes,
      },
      {
        path: 'article/:articleId',
        Component: EditArticle,
      },
      {
        path: 'recette/:recetteId',
        Component: EditRecette,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
