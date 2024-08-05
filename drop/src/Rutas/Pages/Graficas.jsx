import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Diseños/DesingGraficas.css';

const Graficas = () => {
  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Consumo de Agua (litros)',
        data: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['San Luis Rio Colorado', 'Ejido Islitas', 'Ejido Adelitas'],
    datasets: [
      {
        label: 'Clientes por Municipio',
        data: [150, 100, 50],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
      },
    ],
  };

  const doughnutData = {
    labels: ['San Luis Rio Colorado', 'Ejido Islitas', 'Ejido Adelitas'],
    datasets: [
      {
        data: [32, 45, 23],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
      },
    ],
  };

  const totalClientesData = {
    labels: ['Clientes Registrados'],
    datasets: [
      {
        data: [300],
        backgroundColor: ['#36a2eb'],
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
      <div className="chart-row">
        <div className="chart-container">
          <h2>Consumo de Agua por Mes</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Graficas;
