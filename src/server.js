import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetchData from './fetchData.js';

const app = express();
const port = 3000;

// Obtener la ruta actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para obtener los datos de la API del BOE
app.get('/api/boe', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al obtener datos del BOE');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
