import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import Logo_1 from '../img/Logo_1.png';

const AddScreen: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        entryDate: '',
        price: 0,
        provider: '',
        stockMin: 0,
        currentStock: 0,
        maxStock: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name.includes('Stock') || name === 'stockMin' ? Number(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:3001/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            navigate('/');  // Navigate to Dashboard after submitting
        })
        .catch(error => {
            console.error('Error:', error);
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
