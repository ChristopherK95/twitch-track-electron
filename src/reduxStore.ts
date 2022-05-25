import { createStore } from "redux";

const initState = {
  notifs: [{ text: "", color: "" }],
};

const reducer = (
  state = initState,
  action: { type: string; text: string; color: string }
) => {
  switch (action.type) {
    case "NOTIF":
      return {
        ...state,
        notifs: [{ text: action.text, color: action.color }],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
