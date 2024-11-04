import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Routes/Login';
import ForgotPwd from './Routes/ForgotPwd';
import Register from './Routes/Register';
import reportWebVitals from './reportWebVitals';
import Home from './Routes/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { Presence } from './Routes/Presence';
import { PresenceCheck } from './Routes/Presence/PresenceCheck';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPwd />}/>
        <Route path='/presence' element={<Presence />}/>
        <Route path='/presence/check' element={<PresenceCheck />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
