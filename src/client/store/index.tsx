import { createContext, useReducer, useMemo, useContext, type Dispatch } from "react";

import { appReducer } from "./reducer";
import { initialState } from "./init";
import { type AppReducerAction } from "./actions";

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

  const context = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
