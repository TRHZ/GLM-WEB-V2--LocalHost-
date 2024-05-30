import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardScreen from './screens/Dashboard';
import AddScreen from './screens/AddScreen';
import './styles.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardScreen />} />
                <Route path="/add" element={<AddScreen />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;

//Explicar la ejecucion
//Explicar la navegacion con react router
//Explicar las pruebas
