// scripts/probar-esquema.js — prueba las reglas del modelo SIN internet ni Atlas
// Ejecuta:  npm run probar
// ✅ = el esquema se comportó como se esperaba   ❌ = falta (o sobra) una regla
import Vinilo from '../src/models/Vinilo.js';

const base = { nombre: 'Abbey Road', autor: 'The Beatles', genero: 'rock', precio: 185000 };

const casos = [
  { titulo: 'Vinilo completo y correcto', esperado: 'valido', datos: base },
  { titulo: 'Sin nombre', esperado: 'invalido', datos: { ...base, nombre: undefined } },
  { titulo: 'Sin autor', esperado: 'invalido', datos: { ...base, autor: undefined } },
  { titulo: 'Género que no existe', esperado: 'invalido', datos: { ...base, genero: 'reggaeton' } },
  { titulo: 'Precio negativo', esperado: 'invalido', datos: { ...base, precio: -5 } },
  { titulo: 'Cantidad negativa', esperado: 'invalido', datos: { ...base, cantidadDisponible: -1 } },
];

let aprobados = 0;

for (const caso of casos) {
  const vinilo = new Vinilo(caso.datos);
  let errores = null;

  try {
    await vinilo.validate();
  } catch (error) {
    errores = error.errors;
  }

  const ok = (errores ? 'invalido' : 'valido') === caso.esperado;
  if (ok) aprobados++;
  console.log(`${ok ? '✅' : '❌'} ${caso.titulo}  (esperado: ${caso.esperado})`);
  if (errores) {
    for (const [campo, e] of Object.entries(errores)) console.log(`      · ${campo}: ${e.message}`);
  }
}

// Valor por defecto: si no envío cantidadDisponible, debe quedar en 0
const sinCantidad = new Vinilo(base);
const defaultOk = sinCantidad.cantidadDisponible === 0;
if (defaultOk) aprobados++;
console.log(`${defaultOk ? '✅' : '❌'} Cantidad por defecto = 0  (quedó en: ${sinCantidad.cantidadDisponible})`);

console.log(`\n${aprobados} de ${casos.length + 1} pruebas correctas`);
