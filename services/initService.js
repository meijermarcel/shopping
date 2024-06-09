const { StoreItem } = require('../models/storeItem');
const { StoreItemPrice } = require('../models/storeItemPrice');

const init = () => {
    StoreItemPrice.belongsTo(StoreItem, { foreignKey: 'storeItemId' });
    StoreItem.hasMany(StoreItemPrice, { foreignKey: 'storeItemId', sourceKey: 'id' });
};

module.exports = { init };
