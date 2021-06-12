const { Sequelize } = require('sequelize');

//importar las variables
require('dotenv').config({path: 'variables.env'})

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize( process.env.BD_NOMBRE, 
                                 process.env.BD_USER,
                                 process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define:{
        timestamps: false
    }
});

module.exports = sequelize;