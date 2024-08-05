import React from 'react';
import { useAuth } from '../../AuthContext';
import "./Diseños/DesingPerfil.css";

const Perfil = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>; // Optionally redirect or show a loading message
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h1>Perfil</h1>
        </div>
        <div className="perfil-info">
          <div>
            <i className="fas fa-user"></i>
            <p><strong>Nombre:</strong> {user.Nombre}</p>
          </div>
          <div>
            <i className="fas fa-id-badge"></i>
            <p><strong>Clave Única:</strong> {user.ClaveUnica}</p>
          </div>
          <div>
            <i className="fas fa-file-alt"></i>
            <p><strong>RFC:</strong> {user.RFC}</p>
          </div>
          <div>
            <i className="fas fa-id-card"></i>
            <p><strong>CURP:</strong> {user.CURP}</p>
          </div>
          <div>
            <i className="fas fa-map-marker-alt"></i>
            <p><strong>Dirección:</strong> {user.Direccion}</p>
          </div>
          <div>
            <i className="fas fa-calendar-alt"></i>
            <p><strong>Fecha de Nacimiento:</strong> {new Date(user.Fecha_nac).toLocaleDateString()}</p>
          </div>
          <div>
            <i className="fas fa-comment"></i>
            <p><strong>Comentarios:</strong> {user.Comentarios}</p>
          </div>
          <div>
            <i className="fas fa-check-circle"></i>
            <p><strong>Estado:</strong> {user.Estado}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
