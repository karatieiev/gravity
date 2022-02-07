import React from 'react';
import ReactDOM from 'react-dom';
import {MainContextProvider} from "./context/MainContextProvider";
import {App} from "./App";

ReactDOM.render(
    <React.StrictMode>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
