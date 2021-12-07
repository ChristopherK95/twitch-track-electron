// import electron from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MainWindow } from "./components/mainWindow";
import { Info } from "./windows/Info";
import { Splash } from "./windows/Splash";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/App" element={<MainWindow />} />
          <Route path="/Splash" element={<Splash />} />
          <Route path="/Info" element={<Info />} />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
