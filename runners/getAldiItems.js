const axios = require('axios');
const dayjs = require('dayjs');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: require('find-config')('.env') });
}

const { StoreItem } = require('../models/storeItem');
const { StoreItemPrice } = require('../models/storeItemPrice');

async function getAldiItems(category_key) {
    let maxPage = 1;
    let currentPage = 0;
    const itemsPerPage = 48;
    while (currentPage < maxPage) {
        const url = `https://api.aldi.us/v1/catalog-search-product-offers?currency=USD&serviceType=pickup&page%5Blimit%5D=${itemsPerPage}&page%5Boffset%5D=${
            currentPage * itemsPerPage
        }&sort=relevance&category_key=${category_key}&merchantReference=467-108`;
        const res = await axios.get(url);

        const results = res.data.data[0].attributes.catalogSearchProductOfferResults;
        const pagination = res.data.data[0].attributes.pagination;
        currentPage = pagination.currentPage;
        maxPage = pagination.maxPage;
        for (let result of results) {
            const nameSplit = result.name.split(',');
            const description = nameSplit[0];
            // remove $ sign
            const price = result.prices[0].formattedPrice.slice(1);
            const contentUnit = result.contentUnit;
            const netContent = result.netContent;

            const imageLink = result.images && result.images.length ? result.images[0].externalUrlLarge : '';
            const existingStoreItem = await StoreItem.findOne({
                where: {
                    description
                }
            });

            let storeItemId;

            if (existingStoreItem) {
                storeItemId = existingStoreItem.id;
            } else {
                const newStoreItem = await StoreItem.create({
                    description,
                    amount: netContent,
                    units: contentUnit,
                    imageLink
                });
                storeItemId = newStoreItem.id;
            }

            if (storeItemId) {
                await StoreItemPrice.create({
                    storeItemId,
                    price,
                    dateTime: dayjs().startOf('day').format()
                });
            }
        }
    }
}

// Fresh Fruit
getAldiItems(89);
// Fresh Vegetables
getAldiItems(90);
// Salad Kits
getAldiItems(167);
// Frozen Meat, Poultry & Seafood"
getAldiItems(94);
// Frozen Vegetables
getAldiItems(163);
