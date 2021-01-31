import React from 'react';
// import ReactDOM, { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-snapshot';
import { CookiesProvider } from 'react-cookie'	// ←react-cookeもモジュールを読み込む



// snap
// const rootElement = document.getElementById("root");
// if (rootElement != null && rootElement.hasChildNodes()) {
//   hydrate(
//     <App />,
//     rootElement);
// } else {
//   render(
//     <App />,
//     rootElement);
// }


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')

// );

// snapshot
render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
