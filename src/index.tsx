import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// import { MainWindow } from "../components/mainWindow";
// import { Splash } from "./windows/Splash";
import { Provider } from 'react-redux';
import { store } from './reduxStore';
import MainWindow from './components/main-window/MainWindow';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border: 5px solid #181819;
    border-radius: 10px;
    margin: 3px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #5e5e5e;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #828181;
  }

  ::-webkit-scrollbar-thumb:active {
    background: #343434;
  }
`;

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainWindow />} />

            {/* <Route path="/Splash" element={<Splash />} /> */}
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
