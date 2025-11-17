import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GridSmallBackground } from "./components/GridSmallBackground.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GridSmallBackground>
      <App />
    </GridSmallBackground>
  </BrowserRouter>
);
