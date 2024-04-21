// Paso 1: Importar Express y el módulo para trabajar con MySQL
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Importar el módulo de CORS

// Paso 2: Crear una instancia de la aplicación Express
const app = express();

// Paso 3: Configurar middleware para analizar solicitudes JSON
app.use(express.json());

// Paso 4: Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Ruta GET para la raíz del servidor
app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});

// Paso 5: Configurar la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306, 
  user: 'root',
  password: 'Sebas1127*',
  database: 'pharmacommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Paso 6: Definir la ruta POST para la autenticación de usuarios
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Realizar una consulta a la base de datos para verificar las credenciales
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [username, password]);
    
    // Verificar si se encontraron resultados
    if (rows.length > 0) {
      // Si las credenciales son válidas, responder con un mensaje de éxito
      res.status(200).json({ message: 'Autenticación exitosa' });
    } else {
      // Si las credenciales son inválidas, responder con un mensaje de error
      res.status(401).json({ message: 'Error en la autenticación' });
    }
  } catch (error) {
    // Si ocurre un error, responder con un mensaje de error interno del servidor
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Paso 7: Iniciar el servidor y escuchar en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});