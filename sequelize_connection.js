const Sequelize = require('sequelize');

const sequelize_connection = new Sequelize('thesupercoderdb', 'postgres', 'm7s5p2r5s2rPASSWORD321', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
// exports.sequelize_connection = sequelize_connection;
module.exports = sequelize_connection;
