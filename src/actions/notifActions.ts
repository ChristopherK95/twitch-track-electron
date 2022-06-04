import { createAction } from "@reduxjs/toolkit";

export const addNotif = createAction<{ name: string; live: boolean }>(
  "addNotif"
);
export const deleteNotif = createAction<string>("deleteNotif");

export const addNotifHistory = createAction<{
  name: string;
  live: boolean;
  time: string;
}>("addNotifHistory");
export const deleteNotifHistory = createAction<{ id: string }>(
  "deleteNotifHistory"
);
export const deleteAllHistory = createAction("deleteAllHistory");
