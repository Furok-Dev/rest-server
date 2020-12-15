/**
 * ?Archivo de entrada de la aplicacion
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userService = require('./routes/user-routes');
const adminService = require('./routes/admin-routes');

//userService
userService(app);
//adminService
adminService(app);

//middlewre
app.use(bodyParser.urlencoded({ extended: false }));

//parse aplication
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('probado la ruta GENERAL');
});

app.post('/', (req, res) => {
  const body = req.body;
  res.json({
    body,
  });
});

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000');
});
