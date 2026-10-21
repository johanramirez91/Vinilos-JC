// src/config/db.js — conecta Node con MongoDB Atlas
import mongoose from 'mongoose';

export async function conectarDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta MONGODB_URI en el archivo .env');

  // Si Atlas no responde en 8 segundos, falla (por defecto esperaría 30)
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log('🟢 Conectado a MongoDB:', mongoose.connection.name);
}
