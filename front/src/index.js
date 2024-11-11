import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Routes/Login';
import ForgotPwd from './Routes/ForgotPwd';
import Register from './Routes/Register';
import reportWebVitals from './reportWebVitals';
import Home from './Routes/Home';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'; 
import { Presence } from './Routes/Presence';
import { PresenceCheck } from './Routes/Presence/PresenceCheck';
import { AuthProvider } from './Contexts/AuthContext';
import { ProtectedRoute } from './Components/ProtectedRoute/index.jsx';
import { ThemeProvider } from './Contexts/ThemeContext.jsx';
import { UserPage } from './Routes/UserPage/index.jsx';
import { PresenceHistory } from './Routes/Presence/PresenceHistory/index.jsx';
import { History } from './Routes/History/index.jsx';
import { Grades } from './Routes/Grades/index.jsx';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* publicas */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/forgot-password' element={<ForgotPwd />} />
            
            {/* protegidas */}
            <Route element={<ProtectedLayout/>}>
              <Route path='/' element={<Home />}/>
              <Route path='/profile' element={<UserPage />}/>
              <Route path='/grades' element={<Grades />}/>
              <Route path='/presence' element={<Presence />}/>
              <Route path='/presence/check' element={<PresenceCheck />}/>
              <Route path='/presence/history' element={<PresenceHistory />}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
