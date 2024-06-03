const axios = require('axios');
// const cheerio = require('cheerio');
const dayjs = require('dayjs')

if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').load();
    require('dotenv').config({ path: require('find-config')('.env') });
}

const { StoreItem } = require('./models/storeItem');
const { StoreItemPrice } = require('./models/storeItemPrice');


// axios.get('https://new.aldi.us/products/fresh-produce/fresh-fruit/k/89?label=organic').then((res) => {
//     // console.log(res.data);
//     const $ = cheerio.load(res.data);
//     $('.product-tile').each((index, element) => {
//         // console.log(element);
//         const productTitle = $(element).find('.product-tile__name').text();
//         // console.log($(element).find('product-tile__name'));
//         const basePrice = $(element).find('.base-price').text();
//         console.log(productTitle, basePrice);
//         // console.log($(element).text())
//     });
// }).catch(err => console.log(err));

axios.get('https://api.aldi.us/v1/catalog-search-product-offers?currency=USD&serviceType=pickup&page%5Blimit%5D=24&page%5Boffset%5D=0&label%5B%5D=organic&sort=relevance&category_key=89&merchantReference=467-108').then(async res => {
    const results = res.data.data[0].attributes.catalogSearchProductOfferResults;
    for (let result of results) {
        const description = result.name;
        // remove $ sign
        const price = result.prices[0].formattedPrice.slice(1);
        console.log(result.name, price);
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
                description
            });
            storeItemId = newStoreItem.id;
        }

        if (storeItemId) {
            await StoreItemPrice.create({
                storeItemId,
                price,
                dateTime: dayjs().format()
            });
        }

        console.log(existingStoreItem);
    }
}).catch(err => console.log(err));