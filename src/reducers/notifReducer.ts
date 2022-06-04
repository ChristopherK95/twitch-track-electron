import { createReducer } from "@reduxjs/toolkit";
import { Notif, SavedNotif } from "../interfaces/StreamerContext";
import {
  addNotif,
  deleteNotif,
  addNotifHistory,
  deleteAllHistory,
} from "../actions/notifActions";
import { nanoid } from "nanoid";

const initialState: { notifs: Notif[]; notifHistory: SavedNotif[] } = {
  notifs: [],
  notifHistory: [],
};

const notifReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addNotif, (state, action) => {
      state.notifs.push({ ...action.payload, id: nanoid() });
    })
    .addCase(deleteNotif, (state, action) => {
      state.notifs = state.notifs.filter(
        (notif) => notif.id !== action.payload
      );
    })
    .addCase(addNotifHistory, (state, action) => {
      state.notifHistory.push({ ...action.payload, id: nanoid() });
    })
    .addCase(deleteAllHistory, (state) => {
      state.notifHistory = [];
    });
});

export default notifReducer;
