import React from "react";
import ConfigueRouter from "./router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigueRouter />
    </BrowserRouter>
  );
};

export default App;
