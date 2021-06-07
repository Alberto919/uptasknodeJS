const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('uptasknode', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define:{
        timestamps: false
    }
});

module.exports = sequelize;