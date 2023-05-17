import React from "react";
import Routes from "./routes";
import { AppContext } from "./context/AppContext";

export const App: React.FC = () => {
  return (
    <AppContext>
      <Routes />
    </AppContext>
  );
};
