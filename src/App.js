import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassPage from './pages/ForgotPass/ForgotPassPage';
import ResetPass from './pages/ForgotPass/ResetPassPage';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';
// import { useState } from 'react';

function App() {
  // const [token, setToken] = useState();

  // if(!token)
  // {
  //   return <LoginPage setToken= {setToken}/>
  // }
  return (
    // <Router>

    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>


  );
}

export default App;
