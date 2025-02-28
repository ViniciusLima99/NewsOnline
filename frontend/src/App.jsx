import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Principal from './Components/Principal';
import Cadastro from './Components/Cadastro';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import "./App.css";

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();
  
  // Define as rotas onde a Navbar NÃO deve aparecer
  const hideNavbarRoutes = ["/login", "/cadastro"];

  return (
    <>
      {/* Exibe a Navbar apenas se a rota atual não estiver na lista */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Principal />} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
