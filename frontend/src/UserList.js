import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data.users); // Asegúrate de que estás accediendo a la propiedad 'users'
                setLoading(false);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los usuarios:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Listado de Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.user_id}`}>{user.name} - {user.email}</Link> {/* Cambia user.id por user.user_id */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
