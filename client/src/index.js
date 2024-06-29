import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
let root = container._reactRootContainer;

if (!root) {
    root = ReactDOMClient.createRoot(container);
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        root.render(
            <React.StrictMode>
                <NextApp />
            </React.StrictMode>
        );
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
