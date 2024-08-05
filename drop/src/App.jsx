import './App.css';
import { AuthProvider } from './AuthContext';
import Rutas from './Rutas/RutasPublic-Priv/Rutas';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Rutas />
      </AuthProvider>
    </div>
  );
}

export default App;
