// seed/seed.js — borra la colección y la llena con 8 vinilos de ejemplo
// Ejecuta:  npm run seed      (solo el mentor, antes de la clase)
import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile } from 'node:fs/promises';
import { conectarDB } from '../src/config/db.js';
import Vinilo from '../src/models/Vinilo.js';

const vinilos = JSON.parse(await readFile(new URL('./vinilos.json', import.meta.url), 'utf8'));

try {
  await conectarDB();
  await Vinilo.deleteMany({});
  const creados = await Vinilo.insertMany(vinilos);
  console.log(`🎵 ${creados.length} vinilos cargados`);
} catch (error) {
  console.error('❌', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
