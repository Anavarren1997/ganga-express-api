import express from 'express';
import multer from 'multer';
import papa from 'papaparse';
import fs from 'fs';
import connection from './database';

const app = express();

const PORT = 3000;

// Configura Multer para guardar el archivo subido
const upload = multer({ dest: 'uploads/' });

// Middleware para parsear el cuerpo de las peticiones JSON automáticamente
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo con ES612837!');
});

app.post('/upload-csv', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  console.log('Archivo recibido y en proceso de convertir a JSON...');

  // Lee el archivo CSV
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo el archivo:', err);
      return res.status(500).send('Error procesando el archivo');
    }

    // Convierte CSV a JSON
    papa.parse(data, {
      complete: (result) => {
        console.log('CSV convertido a JSON:', result.data);
        // Envía la respuesta JSON
        res.json(result.data);
      },
      error: (error) => {
        console.error('Error al convertir CSV a JSON:', error);
        res.status(500).send('Error al convertir CSV a JSON');
      },
      header: true, // Considera la primera fila del CSV como encabezados de columna
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
