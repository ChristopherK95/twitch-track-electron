// import electron from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MainWindow } from "./components/mainWindow";
import { Splash } from "./splash/Splash";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/App" element={<MainWindow />} />
          <Route path="/Splash" element={<Splash />} />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
