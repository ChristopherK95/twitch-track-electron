// import electron from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainWindow } from "./components/mainWindow";

function render() {
  ReactDOM.render(<MainWindow />, document.getElementById("root"));
}

render();
