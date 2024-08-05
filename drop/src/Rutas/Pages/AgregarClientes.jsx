import React, { useState } from 'react';
import axios from 'axios';
import './Diseños/DesingAgregar.css'; // Importa tus estilos CSS personalizados

const AgregarClientes = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Municipio: '', // Corregido el nombre del campo
    Direccion: '',
    Celular: '',
    Correo: '',
    Contraseña: '',
    Estado: 'Activo' // Valor predeterminado
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/cliente', formData);
      alert('Cliente agregado exitosamente');
      setFormData({
        Nombre: '',
        Municipio: '',
        Direccion: '',
        Celular: '',
        Correo: '',
        Contraseña: '',
        Estado: 'Activo'
      });
    } catch (error) {
      console.error('Error al agregar el cliente', error);
      alert('Hubo un error al agregar el cliente');
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
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default AgregarClientes;
