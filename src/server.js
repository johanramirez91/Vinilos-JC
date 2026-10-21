// src/server.js — punto de entrada: conecta la base y luego abre el servidor
import 'dotenv/config'; // carga las variables del archivo .env
import app from './app.js';
import { conectarDB } from './config/db.js';

const PORT = process.env.PORT || 3000;

try {
  await conectarDB();
  app.listen(PORT, () => console.log(`🚀 API lista en http://localhost:${PORT}`));
} catch (error) {
  console.error('❌ No se pudo iniciar:', error.message);
  process.exit(1);
}
