const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.mySQL_uri, {
  host: process.env.host,
  port: process.env.sql_PORT,
  dialect: 'mysql',
//   dialectOptions: {
//     charset: 'utf8mb4',
//   },
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;

