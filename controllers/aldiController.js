const { StoreItem } = require('../models/storeItem');
const { StoreItemPrice } = require('../models/storeItemPrice');

const init = (router) => {
    router.get('/aldi/items', async (req, res) => {
        const items = await StoreItem.findAll();
        res.send(items);
    });

    router.get('/aldi/item/:id', async (req, res) => {
        const item = await StoreItem.findOne({
            include: [
                {
                    model: StoreItemPrice
                }
            ],
            where: {
                id: req.params.id
            }
        });
        res.send(item);
    });
};

module.exports = { init };
