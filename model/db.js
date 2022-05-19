'use strict'

const env = process.env.NODE_ENV || 'dev';
const conf = require('../config/conf.json')[env];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(conf.db.name, conf.db.user, conf.db.pass, {
  dialect: 'postgres',
  host: conf.db.host,
  port: conf.db.port,
  timezone: 'Asia/Kuala_Lumpur',
  dialectOptions: {
    useUTC: true
  },
  pool: {
    max: 20,
    min: 10,
    idle: 600000
  },
  logging: false,
  alter: false
});

const models = [
  'user'
];

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.log('Cannot authenticate.')
    console.log('Error:' + err);
  })
for(let model of models){
  db[model] = require(`./${model}.js`)(sequelize, Sequelize);  
}

sequelize.sync();

module.exports = db;