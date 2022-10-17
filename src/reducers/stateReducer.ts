/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { State } from '../interfaces/StreamerContext';
import { changeState } from '../actions/stateActions';

const initialState: { state: State } = {
  state: State.main
};

const stateReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeState, (state, action) => {
    state.state = action.payload;
  });
});

export default stateReducer;
