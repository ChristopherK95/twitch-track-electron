import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "./reducers/notifReducer";

export const store = configureStore({
  reducer: { notifs: notifReducer },
});

export type RootState = ReturnType<typeof store.getState>;
