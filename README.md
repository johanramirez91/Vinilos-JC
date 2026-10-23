# 🎵 Vinilos API

API REST para gestionar el inventario de una tienda de vinilos. Permite crear, consultar, actualizar y eliminar discos.

**Stack:** Node.js 20+, Express 5, Mongoose 9, MongoDB Atlas.
**Producción:** https://vinilos-jc.vercel.app

## Instalación local

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```env
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@cluster.mongodb.net/vinilos?retryWrites=true&w=majority
PORT=3000
```

> `/vinilos` antes del `?` es el nombre de la base de datos.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor con recarga automática |
| `npm start` | Inicia el servidor |
| `npm run seed` | Borra la colección y carga 8 vinilos de ejemplo |
| `npm run probar` | Prueba el esquema del modelo |

## Modelo `Vinilo`

| Campo | Tipo | Obligatorio | Reglas |
| --- | --- | --- | --- |
| `nombre` | String | Sí | Se recortan espacios |
| `autor` | String | Sí | Se recortan espacios |
| `genero` | String | Sí | `rock`, `pop`, `jazz`, `salsa`, `hiphop`, `electronica` |
| `precio` | Number | Sí | Mínimo 0 |
| `cantidadDisponible` | Number | No | Por defecto 0, mínimo 0 |

Cada documento incluye además el `_id` generado por MongoDB.

## Endpoints

Ruta base: `/api/vinilos`

| Método | Ruta | Descripción | Respuesta exitosa |
| --- | --- | --- | --- |
| GET | `/` | Verifica que el servidor está activo | 200 |
| POST | `/api/vinilos` | Crea un vinilo | 201 |
| GET | `/api/vinilos` | Lista todos los vinilos | 200 |
| GET | `/api/vinilos/:id` | Obtiene un vinilo por id | 200 |
| PUT | `/api/vinilos/:id` | Actualiza los campos enviados | 200 |
| DELETE | `/api/vinilos/:id` | Elimina un vinilo | 200 |

### Estado del servidor

```bash
curl https://vinilos-jc.vercel.app/
```

```json
{ "mensaje": "Tienda de vinilos 🎵" }
```

### Crear un vinilo

`POST /api/vinilos`

```bash
curl -X POST https://vinilos-jc.vercel.app/api/vinilos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Discovery",
    "autor": "Daft Punk",
    "genero": "electronica",
    "precio": 180000,
    "cantidadDisponible": 4
  }'
```

Respuesta `201`:

```json
{
  "_id": "665f1c2e9b1d8a0012a4b7c1",
  "nombre": "Discovery",
  "autor": "Daft Punk",
  "genero": "electronica",
  "precio": 180000,
  "cantidadDisponible": 4
}
```

### Listar todos

`GET /api/vinilos`

```bash
curl https://vinilos-jc.vercel.app/api/vinilos
```

Respuesta `200`: un arreglo con todos los vinilos.

```json
[
  {
    "_id": "665f1c2e9b1d8a0012a4b7c1",
    "nombre": "Discovery",
    "autor": "Daft Punk",
    "genero": "electronica",
    "precio": 180000,
    "cantidadDisponible": 4
  }
]
```

### Obtener uno por id

`GET /api/vinilos/:id`

```bash
curl https://vinilos-jc.vercel.app/api/vinilos/665f1c2e9b1d8a0012a4b7c1
```

### Actualizar

`PUT /api/vinilos/:id`. Solo cambian los campos que envíes y se vuelven a validar las reglas del esquema.

```bash
curl -X PUT https://vinilos-jc.vercel.app/api/vinilos/665f1c2e9b1d8a0012a4b7c1 \
  -H "Content-Type: application/json" \
  -d '{ "precio": 150000, "cantidadDisponible": 10 }'
```

Respuesta `200`: el vinilo ya actualizado.

### Eliminar

`DELETE /api/vinilos/:id`

```bash
curl -X DELETE https://vinilos-jc.vercel.app/api/vinilos/665f1c2e9b1d8a0012a4b7c1
```

Respuesta `200`:

```json
{
  "mensaje": "Vinilo eliminado",
  "vinilo": { "_id": "665f1c2e9b1d8a0012a4b7c1", "nombre": "Discovery", "...": "..." }
}
```

## Manejo de errores

| Código | Cuándo ocurre | Ejemplo de respuesta |
| --- | --- | --- |
| 400 | Faltan campos o no cumplen las reglas | `{ "error": "Datos inválidos", "detalles": ["El autor es obligatorio"] }` |
| 400 | El `id` no tiene formato válido | `{ "error": "El id no tiene un formato válido" }` |
| 400 | El JSON está mal escrito | `{ "error": "El JSON enviado está mal escrito" }` |
| 404 | El vinilo no existe | `{ "error": "Vinilo no encontrado" }` |
| 500 | Error inesperado del servidor | `{ "error": "Error del servidor" }` |

Ejemplo de género inválido:

```bash
curl -X POST https://vinilos-jc.vercel.app/api/vinilos \
  -H "Content-Type: application/json" \
  -d '{ "nombre": "Disco raro", "autor": "Alguien", "genero": "reggaeton", "precio": 100000 }'
```

```json
{ "error": "Datos inválidos", "detalles": ["\"reggaeton\" no es un género válido"] }
```

## Pruebas con REST Client

El archivo [requests.http](requests.http) contiene todas las peticiones, incluidos los casos de error. Instala la extensión **REST Client** en VS Code y haz clic en *Send Request* sobre cada bloque. Por defecto apunta a `http://localhost:3000`.

## Despliegue en Vercel

- [api/index.js](api/index.js) es la función serverless que conecta a MongoDB y delega en Express.
- [vercel.json](vercel.json) redirige todas las rutas a esa función.
- Define la variable de entorno `MONGODB_URI` en el proyecto de Vercel y permite `0.0.0.0/0` en *Network Access* de Atlas.

## Estructura

```
api/index.js          Función serverless para Vercel
src/app.js            Aplicación Express
src/server.js         Arranque local
src/config/db.js      Conexión a MongoDB
src/models/Vinilo.js  Esquema y modelo
src/routes/vinilos.js CRUD
seed/                 Datos de ejemplo
```

## Licencia

Ver [LICENSE](LICENSE).
