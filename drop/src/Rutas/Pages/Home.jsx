import React from 'react';
import Login from '../../Componentes/Login/Login';
import Perfil from '../Pages/Perfil';
import { useAuth } from '../../AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? <Perfil /> : <Login />}
    </div>
  );
}

export default Home;
