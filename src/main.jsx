import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
