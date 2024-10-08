import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserDetail from './userDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Lista de Usuarios</h1>
        </header>

        {/* Configuración de rutas */}
        <Routes>
          {/* Ruta para mostrar la lista de usuarios */}
          <Route path="/" element={<UserList />} />
          
          {/* Ruta para mostrar los detalles de un usuario específico */}
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
