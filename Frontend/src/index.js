import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Home from "./components/login.js";
import Welcome from "./components/welcome";
import "./styles.css";
import { AuthProvider } from './context/AuthContext.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
    <App />

    </AuthProvider>
    
  </StrictMode>
);
