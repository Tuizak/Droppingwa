import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import './Diseños/DesingEmpleado.css'; // Ensure this CSS file is created and linked

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('https://appi-wjk3.onrender.com/api/empleados');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div className="empleados-container">
      <h2>Lista de Empleados</h2>
      <div className="table-wrapper">
        <table className="empleados-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>CURP</th>
              <th>RFC</th>
              <th>Direccion</th>
              <th>Fecha de Nacimiento</th>
              <th>Estado</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td data-label="ID">{empleado.id}</td>
                <td data-label="Nombre">{empleado.Nombre}</td>
                <td data-label="CURP">{empleado.CURP}</td>
                <td data-label="RFC">{empleado.RFC}</td>
                <td data-label="Direccion">{empleado.Direccion}</td>
                <td data-label="Fecha de Nacimiento">{empleado.Fecha_nac}</td>
                <td data-label="Estado"><FaCheck className="checkmark" /></td>
                <td data-label="Telefono">{empleado.Telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;
