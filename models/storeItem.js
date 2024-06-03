const Sequelize = require('sequelize');
const db = require('./db.js');

const StoreItem = db.define('storeItem', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: Sequelize.STRING },
});

module.exports = { StoreItem };