/**
 * Servicio para el CRUD de los usuarios
 */

// para la conexion de la base de datos
const MongoDB = require('../database/mongo-db');
// bcrypt para crear password en modo hash y no guardarlos tan como llegan
//const bcrypt = require('bcrypt');

//creacion de la clase para el servicio del usuario
class UserService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoDB();
  }

  // listar a todos los usuarios
  async getUsers({ id }) {
    let userData = await this.mongoDB.getAll(this.collection, { id });
    userData.map((user) => delete user.password);
    return userData;
  }
}

module.exports = UserService;
