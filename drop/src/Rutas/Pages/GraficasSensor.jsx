import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './Diseños/GraficasSensor.css';

const GraficasSensor = () => {
  const [data, setData] = useState({
    sensor1: [],
    sensor2: [],
    sensor3: [],
  });

  const [estadoActual, setEstadoActual] = useState({
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
  });

  const convertToPercentage = (distance) => {
    if (distance <= 3) return 100;
    if (distance <= 4.1) return 90;
    if (distance <= 5.2) return 80;
    if (distance <= 6.3) return 70;
    if (distance <= 7.4) return 60;
    if (distance <= 8.5) return 50;
    if (distance <= 9.6) return 40;
    if (distance <= 10.7) return 30;
    if (distance <= 11.8) return 20;
    if (distance <= 12.9) return 10;
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://appi-wjk3.onrender.com/api/sensores');
        const sensorsData = response.data;

        const sensor1Data = [];
        const sensor2Data = [];
        const sensor3Data = [];

        sensorsData.sort((a, b) => new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora));

        sensorsData.forEach(sensor => {
          const percentage = convertToPercentage(sensor.distancia);

          // Formato simplificado: solo día/mes y hora
          const formattedTimestamp = `${sensor.fecha.slice(8, 10)}/${sensor.fecha.slice(5, 7)} ${sensor.hora.slice(0, 5)}`;

          switch (sensor.id_sensor) {
            case 1:
              sensor1Data.push({ percentage, timestamp: formattedTimestamp });
              break;
            case 2:
              sensor2Data.push({ percentage, timestamp: formattedTimestamp });
              break;
            case 3:
              sensor3Data.push({ percentage, timestamp: formattedTimestamp });
              break;
            default:
              break;
          }
        });

        setData({
          sensor1: sensor1Data,
          sensor2: sensor2Data,
          sensor3: sensor3Data,
        });

        setEstadoActual({
          sensor1: sensor1Data[0]?.percentage || 0,
          sensor2: sensor2Data[0]?.percentage || 0,
          sensor3: sensor3Data[0]?.percentage || 0,
        });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const createChartData = (sensorData) => ({
    labels: sensorData.map((data) => data.timestamp),
    datasets: [{
      label: 'Porcentaje',
      data: sensorData.map((data) => data.percentage),
      borderColor: '#1a237e', // Azul rey oscuro
      backgroundColor: 'rgba(26, 35, 126, 0.2)', // Azul rey oscuro con transparencia
    }],
  });

  return (
    <div className="chart-container">
      <div className="chart-section">
        <h2>Tinaco 1</h2>
        <Line className="chart-item" data={createChartData(data.sensor1)} />
        <div className="percentage-display">Estado actual: {estadoActual.sensor1}%</div>
      </div>

      <div className="chart-section">
        <h2>Tinaco 2</h2>
        <Line className="chart-item" data={createChartData(data.sensor2)} />
        <div className="percentage-display">Estado actual: {estadoActual.sensor2}%</div>
      </div>

      <div className="chart-section">
        <h2>Tinaco 3</h2>
        <Line className="chart-item" data={createChartData(data.sensor3)} />
        <div className="percentage-display">Estado actual: {estadoActual.sensor3}%</div>
      </div>
    </div>
  );
};

export default GraficasSensor;
