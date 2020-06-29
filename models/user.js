const  sequelize_connection  = require("../sequelize_connection");
const Sequelize = require('sequelize');

//create a data model called user in the database with table name user_table
const User = sequelize_connection.define("user_table", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true
        }
    }, 
    password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},
{
   tableName: "user_table",
    createdAt: false,
    updatedAt: false
}
);

// User.sync();

module.exports = User;
// exports.User = User;
