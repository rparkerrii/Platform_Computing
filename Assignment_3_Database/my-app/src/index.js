import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CreateApp } from './App';
import reportWebVitals from './reportWebVitals';

console.log("startin3")

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreateApp />
  </React.StrictMode>
);
console.log("rending")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
console.log("done")
