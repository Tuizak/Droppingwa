import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Diseños/DesingGraficas.css';
import axios from 'axios';

const Graficas = () => {
  const [totalClientes, setTotalClientes] = useState(0);
  const [clientesPorMunicipio, setClientesPorMunicipio] = useState([]);

  useEffect(() => {
    // Obtener total de clientes registrados
    axios.get('https://appi-wjk3.onrender.com/api/clientes')
      .then(response => {
        setTotalClientes(response.data.length); // Asumiendo que cada cliente es un registro

        // Agrupar clientes por municipio
        const municipiosCount = response.data.reduce((acc, cliente) => {
          const municipio = cliente.Municipio;
          if (!acc[municipio]) {
            acc[municipio] = 0;
          }
          acc[municipio]++;
          return acc;
        }, {});

        // Convertir el objeto de conteo en un array para la gráfica
        const municipios = Object.keys(municipiosCount);
        const counts = Object.values(municipiosCount);

        setClientesPorMunicipio(municipios.map((municipio, index) => ({
          Municipio: municipio,
          cantidad: counts[index]
        })));
      })
      .catch(error => console.error('Error fetching total clientes:', error));
  }, []);

  const totalClientesData = {
    labels: ['Clientes Registrados'],
    datasets: [
      {
        data: [totalClientes],
        backgroundColor: ['#36a2eb'],
      },
    ],
  };

  const barData = {
    labels: clientesPorMunicipio.map(item => item.Municipio),
    datasets: [
      {
        label: 'Clientes por Municipio',
        data: clientesPorMunicipio.map(item => item.cantidad),
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'], // Ajustar los colores según la cantidad de municipios
      },
    ],
  };

  return (
    <div className="graficas-container">
      <div className="chart-row">
        <div className="chart-container">
          <h2>Total Clientes Registrados</h2>
          <Doughnut data={totalClientesData} />
        </div>
        <div className="chart-container">
          <h2>Clientes por Municipio</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Graficas;
