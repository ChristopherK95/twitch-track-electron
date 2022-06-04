import { createAction } from "@reduxjs/toolkit";
import { State } from "../interfaces/StreamerContext";

export const changeState = createAction<State>("changeState");
