const { StoreItem } = require('../models/storeItem');
const { StoreItemPrice } = require('../models/storeItemPrice');

const init = (router) => {
    router.get('/aldi/items', async (req, res) => {
        const items = await StoreItem.findAll({
            include: StoreItemPrice
        });
        res.send(items);
    });
};

module.exports = { init };
