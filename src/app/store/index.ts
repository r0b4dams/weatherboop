import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counter from "./counter";
import map from "./map";

export const store = configureStore({
  reducer: { counter, map },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
