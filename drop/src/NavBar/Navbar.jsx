// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./DesingNav.css";
import { CiBellOn, CiUser } from "react-icons/ci";
import {
  HomeOutlined,
  ContactsOutlined,
  PieChartOutlined,
  SolutionOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  UserAddOutlined,
  TeamOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../AuthContext'; // Asegúrate de importar useAuth

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const [showVerticalMenu, setShowVerticalMenu] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  const toggleVerticalMenu = () => {
    setShowVerticalMenu(!showVerticalMenu);
  };

  const handleLogout = () => {
    logout();
    navigate('/Home'); // Redirigir a la página de inicio de sesión después de cerrar sesión
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowVerticalMenu(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar-container">
      <nav className='nav-2'>
        <ul className='horizontal-menu'>
          <li><Link to="/Perfil"> <CiUser />Perfil</Link></li>
          <li><Link to="/Notificaciones"> <CiBellOn />Notificaciones</Link></li>
        </ul>
      </nav>

      <button className="toggle-menu-button" onClick={toggleVerticalMenu}>
        {showVerticalMenu ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      <nav className={`vertical-nav ${showVerticalMenu ? 'show' : 'hide'}`}>
        <ul>
          <li><Link to="/Home"><HomeOutlined /> Inicio</Link></li>
          <li>
            <div className="menu-item" onClick={handleMenu}>
              <TeamOutlined /> Clientes {menu ? <CaretDownOutlined /> : <CaretRightOutlined />}
            </div>
            {menu && (
              <ul className="submenu">
                <li><Link to="/Clientes"><ContactsOutlined />Lista de Clientes</Link></li>
                <li><Link to="/AgregarClientes"><UserAddOutlined />Agregar Cliente</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Graficas"><PieChartOutlined /> Gráficas</Link></li>
          <li><Link to="/Empleados"><SolutionOutlined /> Empleados</Link></li>
        </ul>
        {user && (
          <div className="logout-button-container">
            <button onClick={handleLogout} className="menu-item logout-button">
              <LogoutOutlined /> Cerrar Sesión
            </button>
          </div>
        )}
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
