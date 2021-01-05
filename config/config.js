/**
 * Archivo de configuracion general
 * para las variables de entorno
 */

require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000,
  cors: process.env.CORS,
  dbLocal: process.env.DB_LOCAL,
  dbName: process.env.DB_NAME,
};

module.exports = { config };
