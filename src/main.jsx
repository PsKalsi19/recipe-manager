import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RecipeProvider from "./context/RecipeProvider.jsx";
import RecipeDialog from "./components/RecipeDialog.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <RecipeDialog/>
        <App />
      </RecipeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
