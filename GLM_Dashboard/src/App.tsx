import React from 'react';  // Importa React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa componentes de React Router
import DashboardScreen from './screens/Dashboard';  // Importa la pantalla del dashboard
import AddScreen from './screens/AddScreen';  // Importa la pantalla de adición
import './styles.css';  // Importa el archivo de estilos

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardScreen />} />  // Ruta para el dashboard
                <Route path="/add" element={<AddScreen />} />  // Ruta para la pantalla de adición
                <Route path="*" element={<div>404 Not Found</div>} />  // Ruta para manejar páginas no encontradas
            </Routes>
        </Router>
    );
};

export default App;
