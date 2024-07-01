import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    root.render(
      <React.StrictMode>
        <NewApp />
      </React.StrictMode>
    );
  });
}

reportWebVitals();
