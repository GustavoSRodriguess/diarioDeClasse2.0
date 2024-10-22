import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Routes/Login';
import ForgotPwd from './Routes/ForgotPwd';
import Register from './Routes/Register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Certifique-se de importar isso

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/> {/* home */}
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPwd />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
