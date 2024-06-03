'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('storeItemPrices', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            storeItemId: {
                type: Sequelize.INTEGER,
                references: { model: 'storeItems', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            price: { type: Sequelize.REAL },
            dateTime: { type: Sequelize.DATE },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('storeItemPrices');
    }
};