'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('storeItems', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            description: { type: Sequelize.STRING },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('storeItems');
    }
};