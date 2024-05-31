import React from 'react';  // Importa React
import { render, screen, waitFor } from '@testing-library/react';  // Importa funciones de testing library
import DashboardScreen from '../screens/Dashboard';  // Importa la pantalla del dashboard
import { BrowserRouter as Router } from 'react-router-dom';  // Importa el Router de React Router
import '@testing-library/jest-dom';  // Importa jest-dom para mejores matchers

// Simula ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

global.ResizeObserver = ResizeObserver;

// Mock para imágenes
jest.mock('../src/img/Logo_1.png', () => 'logo.png');

// Helper function to create a mock response
const mockFetch = (input: RequestInfo) => {
    let url;
    if (typeof input === 'string') {
        url = input;
    } else if (input instanceof URL) {
        url = input.href;
    } else {
        url = (input as Request).url;
    }

    switch (url) {
        case 'http://localhost:3001/getProducts':
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve([
                    { id: 1, NAME: 'Product 1', entry_date: '2023-05-29', price: 100, provider: 'Provider 1', stock_min: 10, current_stock: 5, max_stock: 50 }
                ])
            } as Response);
        case 'http://localhost:3001/providerStats':
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve([
                    { provider: 'Provider 1', count: 10 }
                ])
            } as Response);
        case 'http://localhost:3001/overStock':
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ overStock: 5 })
            } as Response);
        default:
            return Promise.reject(new Error('Unknown URL'));
    }
};

describe('DashboardScreen', () => {
    beforeEach(() => {
        // Sobrescribe global.fetch con una función que devuelve la promesa mockFetch
        (global as any).fetch = jest.fn((input: RequestInfo) => mockFetch(input));
    });

    it('fetches and displays data correctly', async () => {
        render(
            <Router>
                <DashboardScreen />
            </Router>
        );

        await waitFor(() => {
            // Verificar que los productos se muestran correctamente
            expect(screen.getByText('Product 1 - 2023-05-29')).toBeInTheDocument();
            expect(screen.getByText('Low Stock')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
            // Verificar que la imagen del logo se muestra
            expect(screen.getByAltText('Logo')).toBeInTheDocument();
        });
    });
});
