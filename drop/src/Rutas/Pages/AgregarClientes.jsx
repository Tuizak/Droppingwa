import React, { useState } from 'react';
import axios from 'axios';
import './Diseños/DesingAgregar.css';

const AgregarClientes = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Municipio: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    Contraseña: '',
    Estado: 'Activo',
    Litros: '' // Campo para la capacidad del tinaco
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear cliente
      const responseCliente = await axios.post('https://appi-wjk3.onrender.com/api/cliente', {
        Nombre: formData.Nombre,
        Municipio: formData.Municipio,
        Direccion: formData.Direccion,
        Celular: formData.Celular,
        Correo: formData.Correo,
        Contraseña: formData.Contraseña,
        Estado: formData.Estado
      });

      // Obtener el ID del cliente creado
      const clienteId = responseCliente.data.insertId;

      // Crear tinaco asociado
      await axios.post('https://appi-wjk3.onrender.com/api/tinaco', {
        id_cliente: clienteId,
        Litros: formData.Litros,
        Nivel: '0' 
      });

      

      alert('Cliente y tinaco agregados exitosamente');
      setFormData({
        Nombre: '',
        Municipio: '',
        Direccion: '',
        Celular: '',
        Correo: '',
        Contraseña: '',
        Estado: 'Activo',
        Litros: ''
      });
    } catch (error) {
      console.error('Error al agregar cliente o tinaco', error);
      alert('Hubo un error al agregar el cliente o tinaco');
    }
  };

  return (
    <div className="agregar-clientes-container">
      <h2>Agregar Cliente</h2>
      <form className="agregar-clientes-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="Nombre"><i className="fas fa-user"></i> Nombre:</label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="Municipio"><i className="fas fa-map-marker-alt"></i> Municipio:</label>
          <select
            id="Municipio"
            name="Municipio"
            value={formData.Municipio}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un municipio</option>
            <option value="San Luis Rio Colorado">San Luis Rio Colorado</option>
            <option value="Ejido Islitas">Ejido Islitas</option>
            <option value="Ejido Adelitas">Ejido Adelitas</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="Direccion"><i className="fas fa-address-card"></i> Dirección:</label>
          <input
            type="text"
            id="Direccion"
            name="Direccion"
            value={formData.Direccion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="Celular"><i className="fas fa-phone"></i> Celular:</label>
          <input
            type="text"
            id="Celular"
            name="Celular"
            value={formData.Celular}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="Correo"><i className="fas fa-envelope"></i> Correo:</label>
          <input
            type="email"
            id="Correo"
            name="Correo"
            value={formData.Correo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="Estado"><i className="fas fa-check-circle"></i> Estado:</label>
          <select
            id="Estado"
            name="Estado"
            value={formData.Estado}
            onChange={handleInputChange}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="Contraseña"><i className="fas fa-lock"></i> Contraseña:</label>
          <input
            type="password"
            id="Contraseña"
            name="Contraseña"
            value={formData.Contraseña}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="Litros"><i className="fas fa-tachometer-alt"></i> Capacidad del Tinaco:</label>
          <select
            id="Litros"
            name="Litros"
            value={formData.Litros}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione capacidad</option>
            <option value="1000">1000 Litros</option>
            <option value="2000">2000 Litros</option>
            <option value="5000">5000 Litros</option>
          </select>
        </div>
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default AgregarClientes;
