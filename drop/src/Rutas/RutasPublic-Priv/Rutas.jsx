import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../NavBar/Navbar';
import Home from '../Pages/Home';
import Clientes from '../Pages/Clientes';
import AgregarClientes from '../Pages/AgregarClientes';
import Empleados from '../Pages/Empleados';
import Graficas from '../Pages/Graficas';
import Notificaciones from '../Pages/Notificaciones';
import Perfil from '../Pages/Perfil';
import ProtectedRoute from './PrivateRoute'; // Ajusta la ruta de importación según sea necesario

const Rutas = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/Clientes' element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
          <Route path='/AgregarClientes' element={<ProtectedRoute><AgregarClientes /></ProtectedRoute>} />
          <Route path='/Empleados' element={<ProtectedRoute><Empleados /></ProtectedRoute>} />
          <Route path='/Graficas' element={<ProtectedRoute><Graficas /></ProtectedRoute>} />
          <Route path='/Notificaciones' element={<ProtectedRoute><Notificaciones /></ProtectedRoute>} />
          <Route path='/Perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default Rutas;
