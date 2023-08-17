import { createContext, useReducer, useMemo, useContext, type Dispatch, useEffect } from "react";

import { appReducer } from "./reducer";
import { initialState } from "./init";
import { setTheme, type AppReducerAction } from "./actions";

interface Context {
  state: AppState;
  dispatch: React.Dispatch<AppReducerAction>;
}

export const AppContext = createContext<Context>({
  state: initialState,
  dispatch: {} as Dispatch<AppReducerAction>,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const theme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
    dispatch(setTheme(theme));
  }, []);

  const context = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
