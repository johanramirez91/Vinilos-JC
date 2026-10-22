import "dotenv/config";
import app from "../src/app.js";
import { conectarDB } from "../src/config/db.js";

let conexion;

export default async function handler(req, res) {
  conexion ??= conectarDB();
  await conexion;
  return app(req, res);
}
