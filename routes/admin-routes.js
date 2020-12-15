const express = require('express');
const bodyParser = require('body-parser');

const adminService = (app) => {
  //router para las rutas internas
  const router = express.Router();
  app.use('/ejemplo', router);
  //middlewre
  router.use(bodyParser.urlencoded({ extended: false }));

  //parse aplication
  router.use(bodyParser.json());

  router.get('/', (req, res) => {
    res.json('probando la ruta de ejemplo');
  });

  router.post('/', (req, res) => {
    const body = req.body;
    res.json({
      body,
    });
  });
};

module.exports = adminService;
