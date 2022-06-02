import { createAction } from "@reduxjs/toolkit";

export const addNotif = createAction<{ name: string; live: boolean }>(
  "addNotif"
);
export const deleteNotif = createAction<string>("deleteNotif");
