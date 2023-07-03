import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Client } from "./client";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLDivElement,
  <React.StrictMode>
    <BrowserRouter>
      <Client />
    </BrowserRouter>
  </React.StrictMode>,
);
