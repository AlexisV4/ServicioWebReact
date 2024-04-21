const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Importa el cliente MySQL

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sebas1127*',
  database: 'pharmacommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint de inicio de sesión
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Consulta para buscar el usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [username]);
    
    // Si no se encontró ningún usuario con el nombre de usuario proporcionado
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const user = rows[0];
    if (user.password === password) {
      // Si la autenticación es exitosa, responder con un mensaje de éxito
      res.status(200).json({ message: 'Autenticación exitosa' });
    } else {
      // Si la autenticación falla, responder con un mensaje de error
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error al buscar el usuario en la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
