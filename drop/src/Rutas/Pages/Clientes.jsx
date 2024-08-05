import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Diseños/DesingClientes.css'; // Importa tus estilos CSS personalizados

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleEstadoCliente = async (id, nuevoEstado) => {
    const confirmMessage = nuevoEstado === 'Inactivo'
      ? "¿Está seguro de que desea dar de baja a este cliente?"
      : "¿Está seguro de que desea dar de alta a este cliente?";
    
    const confirmAction = window.confirm(confirmMessage);
    if (confirmAction) {
      try {
        console.log(`Sending PUT request for cliente id ${id} with data:`, { Estado: nuevoEstado });
        const response = await axios.put(`http://localhost:3001/api/cliente/id/${id}`, { Estado: nuevoEstado });
        if (response.status === 200) {
          setClientes(clientes.map(cliente => cliente.id === id ? { ...cliente, Estado: nuevoEstado } : cliente));
        } else {
          console.error('Failed to update cliente:', response);
        }
      } catch (error) {
        console.error('Error updating cliente:', error);
      }
    }
  };

  return (
    <div className="clientes-container">
      <h2>Clientes Registrados</h2>
      <div className="table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Municipio</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td data-label="ID">{cliente.id}</td>
                <td data-label="Nombre">{cliente.Nombre}</td>
                <td data-label="Celular">{cliente.Celular}</td>
                <td data-label="Correo">{cliente.Correo}</td>
                <td data-label="Municipio">{cliente.Municipio}</td>
                <td data-label="Dirección">{cliente.Direccion}</td>
                <td data-label="Estado">{cliente.Estado}</td>
                <td>
                  {cliente.Estado === 'Activo' ? (
                    <button className="baja-button" onClick={() => handleEstadoCliente(cliente.id, 'Inactivo')}>Dar de baja</button>
                  ) : (
                    <button className="alta-button" onClick={() => handleEstadoCliente(cliente.id, 'Activo')}>Dar de alta</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
