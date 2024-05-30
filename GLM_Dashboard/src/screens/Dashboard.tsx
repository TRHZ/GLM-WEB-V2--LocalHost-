import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import Logo_1 from '../img/Logo_1.png';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

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
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [providerStats, setProviderStats] = useState<{ provider: string, count: number }[]>([]);
    const [overStock, setOverStock] = useState<number>(0);

    useEffect(() => {
        fetch('http://localhost:3001/getProducts')
            .then(response => response.json())
            .then(data => {
                // Ordenar los productos por fecha de entrada de más reciente a más antiguo
                const sortedProducts = data.sort((a: Product, b: Product) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());
                // Mantener solo los 15 productos más recientes
                setProducts(sortedProducts.slice(0, 15));
            })
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:3001/providerStats')
            .then(response => response.json())
            .then(data => {
                setProviderStats(data);
            })
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:3001/overStock')
            .then(response => response.json())
            .then(data => setOverStock(data.overStock))
            .catch(error => console.error('Error:', error));
    }, []);

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
