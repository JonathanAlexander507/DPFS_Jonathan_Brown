import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacer la solicitud GET al backend
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los productos:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Listado de Productos</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
