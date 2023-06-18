import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./assets/Components/HomePage.jsx";
import FormCard from "./assets/Components/FormCard.jsx";
import ListForms from "./assets/Components/ListForms.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/showForms",
    element: <ListForms />,
  },
  { path: "/", element: <HomePage /> },

  { path: "*", element: <div>No Such Page exists</div> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <HomePage />
  <RouterProvider router={router} />

  // <FormCard />
  // {/* </React.StrictMode> */}
);
