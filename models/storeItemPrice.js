const Sequelize = require('sequelize');
const db = require('./db.js');

const StoreItemPrice = db.define('storeItemPrice', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    storeItemId: { type: Sequelize.INTEGER },
    price: { type: Sequelize.REAL },
    dateTime: { type: Sequelize.DATE },
});

module.exports = { StoreItemPrice };