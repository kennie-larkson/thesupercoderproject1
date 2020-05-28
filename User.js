const { sequelize_connection } = require("./sequelize_connection");
const Sequelize = require('sequelize');
const User = sequelize_connection.define('user', {
    email: Sequelize.STRING,
    password: Sequelize.TEXT
},
{
    tableName: 'user_table'
});
exports.User = User;
