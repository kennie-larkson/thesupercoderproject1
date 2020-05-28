const { sequelize_connection } = require("./sequelize_connection");
const Sequelize = require('sequelize');
const Article = sequelize_connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});
exports.Article = Article;
