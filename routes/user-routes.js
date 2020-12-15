const express = require('express');
const bodyParser = require('body-parser');

const userService = (app) => {
  //router para las rutas internas
  const router = express.Router();
  app.use('/user', router);
  //middlewre
  router.use(bodyParser.urlencoded({ extended: false }));

  //parse aplication
  router.use(bodyParser.json());

  router.get('/', (req, res) => {
    res.json('probado la ruta del usuario');
  });

  router.post('/', (req, res) => {
    const body = req.body;
    res.json({
      body,
    });
  });
};

module.exports = userService;
