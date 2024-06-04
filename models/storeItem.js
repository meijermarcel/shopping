const Sequelize = require('sequelize');
const db = require('./db.js');

const StoreItem = db.define('storeItem', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: Sequelize.STRING },
    amount: { type: Sequelize.REAL },
    units: { type: Sequelize.STRING },
    imageLink: { type: Sequelize.TEXT },
});

module.exports = { StoreItem };