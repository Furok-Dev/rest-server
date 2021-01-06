/* eslint-disable no-unused-vars */
// express para el manejo de las rutas
const express = require('express');
//llamamos al servicio creado para gestionar el CRUD de usuarios
const UserService = require('../services/user-services');
//esquemas para la estructura de los datos
const {
  userIdSchema,
  createUserSchema,
} = require('../utils/schemas/user-schema');

//middleware para la validacion de los datos
const validationHandler = require('../utils/middleware/validationHandler');

//gestion de la API del usuario
const userServiceApi = (app) => {
  //router para las rutas internas
  const router = express.Router();
  //hacemos que la aplicacion use las subrutas gestionadas por el router
  app.use('/users', router);

  //inicializamos el servicio
  const userService = new UserService();

  //rutas para el usuario
  //listar usuario
  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;
      try {
        const userData = await userService.getUsers({ userId });
        res.status(200).json({
          data: userData,
          message: 'Usuarios listados',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = userServiceApi;
