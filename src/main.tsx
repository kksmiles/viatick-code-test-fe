import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./pages/welcome";
import Weather from "./pages/weather";
import DevicesIndex from "./pages/devices/index";
import DevicesShow from "./pages/devices/show";
import ErrorPage from "./shared/error-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/welcome",
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
    <div className="max-w-lg mx-auto overflow-hidden">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
