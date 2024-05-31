import React, { useEffect, useState } from 'react';  // Importa React, useEffect y useState
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la navegación
import '../styles.css';  // Importa el archivo de estilos
import Logo_1 from '../img/Logo_1.png';  // Importa el logo
import { Bar } from 'react-chartjs-2';  // Importa el componente Bar para gráficos de Chart.js
import 'chart.js/auto';  // Importa la configuración automática de Chart.js

// Interfaz para el tipo de producto
interface Product {
    id: number;
    NAME: string;
    entry_date: string;
    price: number;
    provider: string;
    stock_min: number;
    current_stock: number;
    max_stock: number;
}

const DashboardScreen: React.FC = () => {
    const navigate = useNavigate();  // Hook para la navegación
    const [products, setProducts] = useState<Product[]>([]);  // Estado para almacenar los productos
    const [providerStats, setProviderStats] = useState<{ provider: string, count: number }[]>([]);  // Estado para las estadísticas de los proveedores
    const [overStock, setOverStock] = useState<number>(0);  // Estado para el exceso de stock

    // Hook para obtener datos del servidor al montar el componente
    useEffect(() => {
        fetch('http://localhost:3001/getProducts')
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.sort((a: Product, b: Product) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());  // Ordena los productos por fecha
                setProducts(sortedProducts.slice(0, 15));  // Mantiene solo los 15 productos más recientes
            })
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:3001/providerStats')
            .then(response => response.json())
            .then(data => {
                setProviderStats(data);  // Actualiza el estado con las estadísticas de los proveedores
            })
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:3001/overStock')
            .then(response => response.json())
            .then(data => setOverStock(data.overStock))  // Actualiza el estado con el exceso de stock
            .catch(error => console.error('Error:', error));
    }, []);

    // Datos para el gráfico de proveedores
    const providerLabels = providerStats.map(stat => stat.provider);
    const providerCounts = providerStats.map(stat => stat.count);

    const providerChartData = {
        labels: providerLabels,
        datasets: [{
            label: 'Number of Products per Provider',
            data: providerCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().split('T')[0];
    };

    return (
        <div className="screen">
            <div className="header">
                <img src={Logo_1} alt="Logo" className="logo" />
                <button onClick={() => navigate('/add')}>Add</button>  
            </div>
            <div className="container">
                <div className="box low-stock">
                    <h3>Low Stock</h3>
                    <ul>
                        {/* Muestra los productos con stock bajo */}
                        {products.filter(product => product.current_stock < product.stock_min).map(product => (
                            <li key={product.id}>{product.NAME} - Low Stock</li>
                        ))}
                    </ul>
                </div>
                <div className="box over-stock">
                    <h3>Over Stock</h3>
                    <p>{overStock}</p> 
                </div>
                <div className="box recent">
                    <h3>Recent</h3>
                    <ul>
                        {/* Muestra los productos más recientes */}
                        {products.sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()).slice(0, 15).map(product => (
                            <li key={product.id}>{product.NAME} - {formatDate(product.entry_date)}</li>
                        ))}
                    </ul>
                </div>
                <div className="box providers">
                    <h3>Providers</h3>
                    <Bar data={providerChartData} /> 
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
