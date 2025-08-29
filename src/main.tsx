import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./index.css";

import App from "./App.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </RecoilRoot>
    </CookiesProvider>
  </StrictMode>
);
