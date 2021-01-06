/**
 * ?Archivo de entrada de la aplicacion
 */
const express = require('express');
const app = express();
//llamamos a las variables del entorno
const { config } = require('./config/config');

//llamamos a la API del usuario
const userServiceApi = require('./routes/user-routes');

//userService
userServiceApi(app);

//middlewre de body-parser nativo de Expressjs para leer formato JSON
app.use(express.json());

// puerto
const { port } = config;

app.get('/', (req, res) => {
  res.json('probado la ruta GENERAL');
});

app.post('/', (req, res) => {
  const body = req.body;
  res.json({
    body,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(new Error('No se puede iniciar el servidor'));
  }
  console.log(`Listening on port http://localhost:${port}`);
});
