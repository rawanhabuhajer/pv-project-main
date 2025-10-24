import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/global.css";
import "../src/styles/responsive.css";
import Wrapper from "./wrapper";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-left" reverseOrder={false} />
      <Wrapper>
        <App />
      </Wrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
