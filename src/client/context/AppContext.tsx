import React, { useContext, useState } from "react";

interface Context {
  name: string;
  setName: (val: string) => void;
}

interface ContextProps {
  children: React.ReactNode;
}

const init = {
  name: "",
  setName: () => {},
} as Context;

const context = React.createContext(init);
const { Provider } = context;

export const AppContext: React.FC<ContextProps> = ({ children }) => {
  const [name, setName] = useState(init.name);
  return <Provider value={{ name, setName }}>{children}</Provider>;
};

export const useAppContext = () => useContext(context);
