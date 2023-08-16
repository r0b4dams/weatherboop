import * as rtk from "react-redux";
import type { RootState, AppDispatch } from ".";

// use these for type intellisense
export const useAppDispatch: () => AppDispatch = rtk.useDispatch;
export const useAppSelector: rtk.TypedUseSelectorHook<RootState> = rtk.useSelector;
