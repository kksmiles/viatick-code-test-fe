import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./pages/welcome";
import Weather from "./pages/weather";
import DevicesIndex from "./pages/devices/index";
import DevicesShow from "./pages/devices/show";
import ErrorPage from "./shared/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/weather",
    element: <Weather />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/devices",
    element: <DevicesIndex />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/devices/:deviceSlug",
    element: <DevicesShow />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
