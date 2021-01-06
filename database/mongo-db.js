/**
 * clase para la conexion con mongodb
 * usando el patron singleton
 */

const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${DB_NAME}?retryWrites=true&w=majority`;

class MongoDB {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    //implementamos el patron singleton
    if (!MongoDB.connection) {
      MongoDB.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfuly');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoDB.connection;
  }
  //Vamos a implementar las acciones en la base de datos de MongoDB

  //trae todos los usuaios
  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find(query).toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getAll ${err}`));
      });
  }

  //trae un usuario por id
  getOnly(collection, id) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .findOne({ _id: ObjectId(id) })
          .toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getOnly ${err}`));
      });
  }

  //crea un nuevo dato a la coleccion
  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => {
        result.insertedId;
      });
  }

  //actualiza un campo de la colecion
  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => {
        result.upsertedId || id;
      });
  }

  //elimina un dato para siempre
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => {
        id;
      });
  }
}

module.exports = MongoDB;
