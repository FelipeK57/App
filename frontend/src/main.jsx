import * as React from "react";
import * as ReactDom from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/onest";

import Home from "@/pages/Home.jsx";
import TaskList from "./components/TaskList.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    //Home
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      //Task list
      {
        path: "list/:id",
        element: <TaskList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
