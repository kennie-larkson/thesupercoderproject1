const { sequelize_connection } = require("./sequelize_connection");
const Sequelize = require('sequelize');



//create a data model called user in the database with table name user_table
const User = sequelize_connection.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }, 
    user_password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},
{
    tableName: 'user_table',
    createdAt: false,
    updatedAt: false
});







exports.User = User;

