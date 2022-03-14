import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './index.css';
import App from './App';
import ProductPage from './product/ProductPage.js';
import GamePage from './game/GamePage.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="product" element={<ProductPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <h1>URL Error! There's nothing here!</h1>
            </main>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
