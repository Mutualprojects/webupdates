// main.jsx or index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // if using Tailwind or custom styles
import "antd/dist/reset.css"; // ✅ Required for Ant Design v5
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
    <BrowserRouter  basename="/">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
