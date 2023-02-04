import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { InvestorProvider } from "./context/users";
import { SaleProvider } from "./context/sale";
import { AdminProvider } from "./context/admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InvestorProvider>
      <SaleProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </SaleProvider>
    </InvestorProvider>
  </React.StrictMode>
);
