const { sequelize_connection } = require("./sequelize_connection");
const Sequelize = require('sequelize');
const User = sequelize_connection.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_email: Sequelize.STRING,
    user_password: Sequelize.TEXT
},
{
    tableName: 'user_table',
    createdAt: false,
    updatedAt: false
});
exports.User = User;
