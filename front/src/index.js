import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Routes/Login';
import ForgotPwd from './Routes/ForgotPwd';
import Register from './Routes/Register';
import reportWebVitals from './reportWebVitals';
import Home from './Routes/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Certifique-se de importar isso
import { Presence } from './Routes/Presence';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/> {/* home */}
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPwd />}/>
        <Route path='/presence' element={<Presence />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
