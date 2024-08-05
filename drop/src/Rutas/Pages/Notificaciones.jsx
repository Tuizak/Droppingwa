import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Diseños/DesingNotificaciones.css'; // Asegúrate de que la ruta sea correcta

const Notificaciones = () => {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/mensajes')
            .then(response => {
                setMensajes(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    return (
        <div className="notificaciones-container">
            <h2>Notificaciones</h2>
            <div className="notificaciones-list">
                {mensajes.map(mensaje => (
                    <div key={mensaje.id_mensaje} className="notificacion-card">
                        <p><strong>Cliente:</strong> {mensaje.Nombre_cliente}</p>
                        <p><strong>Mensaje:</strong> {mensaje.Mensaje}</p>
                        <p><strong>Fecha:</strong> {new Date(mensaje.Fecha).toLocaleDateString()}</p>
                        <p><strong>Hora:</strong> {mensaje.Hora}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notificaciones;
