// src/app.js — la aplicación Express
import express from 'express';
import cors from 'cors';
import vinilosRouter from './routes/vinilos.js';

const app = express();

// Permite que el frontend (otro dominio/puerto) consuma la API.
// CORS_ORIGIN limita quién puede llamarla (separa varios con comas); si no existe, se permite cualquiera.
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }));
app.use(express.json()); // permite leer el JSON que llega en req.body

app.get('/', (req, res) => res.json({ mensaje: 'Tienda de vinilos 🎵' }));
app.use('/api/vinilos', vinilosRouter);

// Manejo de errores: va SIEMPRE al final y tiene 4 parámetros
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const detalles = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'El id no tiene un formato válido' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El JSON enviado está mal escrito' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error del servidor' });
});

export default app;
