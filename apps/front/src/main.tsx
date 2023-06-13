import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Items } from "./app/items/items";
import { Calendar } from "./app/calendar/calendar";
import { Recettes } from "./app/recettes/recettes";
import { Courses } from "./app/courses/courses";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// https://github.com/remix-run/react-router/tree/dev/examples
// value='/calendar'
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        index: true,
        Component: Calendar
      },
      {
        path: 'calendar',
        Component: Calendar
      },
      {
        path: 'items',
        Component: Items,
      },
      {
        path: 'recettes',
        Component: Recettes
      },
      {
        path: 'courses',
        Component: Courses,

      }
    ]
  }
])

root.render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
