const init = () => {
    StoreItemPrice.belongsTo(StoreItem, { foreignKey: 'storeItemId' });
    StoreItem.hasOne(StoreItemPrice, { foreignKey: 'storeItemId', sourceKey: 'id' });
}