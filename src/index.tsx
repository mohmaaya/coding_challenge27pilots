import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.module.scss";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { worker } from "./mocks/browser";

if (process.env.REACT_APP_MSW === "active") {
 console.log("starting worker");
  worker.start();
}

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
