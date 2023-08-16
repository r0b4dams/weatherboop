import * as rtk from "@reduxjs/toolkit";

import map from "./map";

export const store = rtk.configureStore({
  reducer: { map },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = rtk.ThunkAction<
  ReturnType,
  RootState,
  unknown,
  rtk.Action<string>
>;
