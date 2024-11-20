import React from "react";
import { createRoot } from "react-dom/client";
import { Global, css } from "@emotion/react";

import { App } from "./components/App/App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Global
      styles={css`
        html {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        body {
          font-family: Sans-serif;
        }
      `}
    />

    <App />
  </React.StrictMode>,
);
