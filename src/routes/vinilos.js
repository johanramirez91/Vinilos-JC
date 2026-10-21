// src/routes/vinilos.js — el CRUD completo
// Express 5: los errores de funciones async llegan solos al manejador de errores (no hace falta try/catch)
import { Router } from 'express';
import Vinilo from '../models/Vinilo.js';

const router = Router();

// CREATE — POST /api/vinilos
router.post('/', async (req, res) => {
  const vinilo = await Vinilo.create(req.body ?? {});
  res.status(201).json(vinilo);
});

// READ (todos) — GET /api/vinilos
router.get('/', async (req, res) => {
  const vinilos = await Vinilo.find();
  res.json(vinilos);
});

// READ (uno) — GET /api/vinilos/:id
router.get('/:id', async (req, res) => {
  const vinilo = await Vinilo.findById(req.params.id);
  if (!vinilo) return res.status(404).json({ error: 'Vinilo no encontrado' });
  res.json(vinilo);
});

// UPDATE — PUT /api/vinilos/:id   (solo cambia los campos que envíes)
router.put('/:id', async (req, res) => {
  const vinilo = await Vinilo.findByIdAndUpdate(req.params.id, req.body ?? {}, {
    returnDocument: 'after', // devuelve el vinilo ya actualizado
    runValidators: true, // vuelve a aplicar las reglas del esquema
  });
  if (!vinilo) return res.status(404).json({ error: 'Vinilo no encontrado' });
  res.json(vinilo);
});

// DELETE — DELETE /api/vinilos/:id
router.delete('/:id', async (req, res) => {
  const vinilo = await Vinilo.findByIdAndDelete(req.params.id);
  if (!vinilo) return res.status(404).json({ error: 'Vinilo no encontrado' });
  res.json({ mensaje: 'Vinilo eliminado', vinilo });
});

export default router;
