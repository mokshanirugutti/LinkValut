import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ProtectedRoute from '@/ProtectedRoute';
import Landing from '@/pages/Landing/Landing';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route> 
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<RegisterPage/>} />
       
    </Routes>
  </BrowserRouter>
  )
}

export default App