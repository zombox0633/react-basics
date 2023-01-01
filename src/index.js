import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode> {/* ตัว React.StrictMode จะทำงานเมื่อทำการ run *React.StrictMode จะทำหน้าที่ในการ run ก่อนเพื่อเช็ค error *สามารถปิดได้  */}
    <BrowserRouter> {/* การใส่ BrowserRouter เป็นการกำหนดให้ตัวที่อยู่ใน tag BrowserRouter สามารถใช้ความสามารถของ  react-router-dom ได้ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

