import React from "react";

import { ContextWrapper } from "./Context";
import Main from "./pages/Main";

export const App: React.FC = () => {
  return (
    <ContextWrapper>
      <Main />
    </ContextWrapper>
  );
};

export default App;
