import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { render } from "react-dom";
import GameStateProvider, { useGameStateContext } from "./GameStateProvider";
import "./styles.scss";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </StrictMode>
);
