// src/models/Vinilo.js — el esquema (reglas) y el modelo (herramienta para guardar/leer)
import mongoose from 'mongoose';

const GENEROS = ['rock', 'pop', 'jazz', 'salsa', 'hiphop', 'electronica'];

const viniloSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    autor: {
      type: String,
      required: [true, 'El autor es obligatorio'],
      trim: true,
    },
    genero: {
      type: String,
      required: [true, 'El género es obligatorio'],
      enum: { values: GENEROS, message: '"{VALUE}" no es un género válido' },
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    cantidadDisponible: {
      type: Number,
      default: 0,
      min: [0, 'La cantidad no puede ser negativa'],
    },
  },
  { versionKey: false } // quita el campo __v que Mongoose agrega por defecto
);

// 'Vinilo' → Mongoose crea/usa la colección "vinilos"
export default mongoose.model('Vinilo', viniloSchema);
