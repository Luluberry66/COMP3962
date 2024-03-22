import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ShopContextProvider from "./Context/ShopContext";
import UserInfoProvider from "./Context/LoggedIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserInfoProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </UserInfoProvider>
);
