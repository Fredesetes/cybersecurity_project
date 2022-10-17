import dbConfig from '../config/db.js';

// Model Import Here:
import Network from '../models/network.model.js';
import User from '../models/user.model.js';

import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add Models Here:
db.Network = Network(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);

export default db;