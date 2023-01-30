const { Sequelize } = require('sequelize');
const setUpModels = require('../db/models');
const config = require('../config/index');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

setUpModels(sequelize);
module.exports = sequelize;
