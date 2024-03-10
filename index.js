import express from 'express';
// import connection from './database.js';
import routes from './routes/index.js';

const app = express();

const PORT = 3000;

// Middleware para parsear el cuerpo de las peticiones JSON automáticamente
app.use(express.json());

// Usamos todas las rutas definidas en /routes/index.js
app.use(routes);

app.get('/', (req, res) => {
  res.send('API de GangaExpress');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
