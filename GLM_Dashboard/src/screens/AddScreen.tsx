import React, { useState } from 'react';  // Importa React y useState para gestionar el estado
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la navegación
import '../styles.css';  // Importa el archivo de estilos
import Logo_1 from '../img/Logo_1.png';  // Importa el logo

const AddScreen: React.FC = () => {
    const navigate = useNavigate();  // Hook para la navegación
    const [formData, setFormData] = useState({
        name: '',
        entryDate: '',
        price: 0,
        provider: '',
        stockMin: 0,
        currentStock: 0,
        maxStock: 0,
    });  // Estado inicial del formulario

    // Manejador de cambios en los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name.includes('Stock') || name === 'stockMin' ? Number(value) : value
        });  // Actualiza el estado del formulario
    };

    // Manejador de envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario
        fetch('http://localhost:3001/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)  // Envía los datos del formulario al servidor
        })
            .then(response => response.text())
            .then(data => {
                alert(data);  // Muestra una alerta con la respuesta del servidor
                navigate('/');  // Navega al dashboard después de enviar el formulario
            })
            .catch(error => {
                console.error('Error:', error);  // Manejo de errores
            });
    };

    return (
        <div className="screen">
            <div className="header">
                <img src={Logo_1} alt="Logo" className="logo" />
                <button onClick={() => navigate('/')}>Dashboard</button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        {/* Campos del formulario */}
                        <input type="text" id="name" name="name" placeholder="Name" required onChange={handleChange} />
                        <input type="date" id="entryDate" name="entryDate" placeholder="Entry Date" required onChange={handleChange} />
                        <input type="number" id="price" name="price" placeholder="Price" required onChange={handleChange} />
                        <input type="text" id="provider" name="provider" placeholder="Provider" required onChange={handleChange} />
                        <input type="number" id="stockMin" name="stockMin" placeholder="Stock Min" required onChange={handleChange} />
                        <input type="number" id="currentStock" name="currentStock" placeholder="Current Stock" required onChange={handleChange} />
                        <input type="number" id="maxStock" name="maxStock" placeholder="Max Stock" required onChange={handleChange} />
                    </div>
                    <div className="price-input">
                        <button type="submit">Add</button>  
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScreen;
