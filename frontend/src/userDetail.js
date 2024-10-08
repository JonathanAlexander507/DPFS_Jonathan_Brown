import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(response => {
                setUser(response.data); // Guarda los datos del usuario en el estado
                setLoading(false);
            })
            .catch(error => {
                console.error('Hubo un error al obtener el usuario:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Detalles del Usuario</h1>
            {user ? (
                <div>
                    <p>ID: {user.user_id}</p>
                    <p>Nombre: {user.name}</p>
                    <p>Apellido: {user.last_name}</p>
                    <p>Correo: {user.email}</p>
                    <p>Provincia: {user.province}</p>
                    <img 
                        src={`http://localhost:3000/images/users/profile_photo/${user.profile_image}`} 
                        alt="Perfil" 
                        style={{ width: '150px', height: '150px' }} 
                    />
                </div>
            ) : (
                <p>Usuario no encontrado.</p>
            )}
        </div>
    );
};

export default UserDetail;
