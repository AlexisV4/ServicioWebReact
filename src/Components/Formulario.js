import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envía los datos del formulario al servidor
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data); // Agrega esta línea para mostrar la respuesta del servidor en la consola
      // Si la autenticación es exitosa, muestra un mensaje de éxito
      setMessage('Autenticación exitosa');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
      // Si la autenticación falla, muestra un mensaje de error
      setMessage('Error en la autenticación');
    }
  };

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <form className="text-center" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="usuario">Usuario</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="contrasena">Contraseña</label>
        </div>
        <button className="btn btn-primary" type="submit">Iniciar Sesión</button>
        {message && <div>{message}</div>} {/* Renderizado condicional del mensaje de éxito o error */}
      </form>
    </div>
  );
}

export default Formulario;
