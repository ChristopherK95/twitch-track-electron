import { createReducer } from "@reduxjs/toolkit";
import { Notif } from "../interfaces/StreamerContext";
import { addNotif, deleteNotif } from "../actions/notifActions";
import { nanoid } from "nanoid";

const initialState: { notifs: Notif[] } = {
  notifs: [],
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
    });
});

export default notifReducer;
