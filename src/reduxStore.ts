import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './reducers/stateReducer';
import notifReducer from './reducers/notifReducer';

export const store = configureStore({
  reducer: { notifs: notifReducer, state: stateReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
