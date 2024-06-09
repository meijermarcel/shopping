const axios = require("axios");
// const cheerio = require('cheerio');
const dayjs = require("dayjs");

if (process.env.NODE_ENV !== "production") {
	// require('dotenv').load();
	require("dotenv").config({ path: require("find-config")(".env") });
}

const { StoreItem } = require("../models/storeItem");
const { StoreItemPrice } = require("../models/storeItemPrice");

function getAldiItems(category_key) {
	let maxPage = 1;
	let currentPage = 0;
	while (currentPage < maxPage) {
		const url = `https://api.aldi.us/v1/catalog-search-product-offers?currency=USD&serviceType=pickup&page%5Blimit%5D=48&page%5Boffset%5D=0&sort=relevance&category_key=${category_key}&merchantReference=467-108`;
		return axios
			.get(url)
			.then(async (res) => {
				const results =
					res.data.data[0].attributes
						.catalogSearchProductOfferResults;
				const pagination = res.data.data[0].attributes.pagination;
				console.log(pagination);
				return;
				for (let result of results) {
					const nameSplit = result.name.split(",");
					const description = nameSplit[0];
					// remove $ sign
					const price = result.prices[0].formattedPrice.slice(1);
					const contentUnit = result.contentUnit;
					const netContent = result.netContent;
					const imageLink = result.images[0].externalUrlLarge;
					console.log(result.name, price);
					const existingStoreItem = await StoreItem.findOne({
						where: {
							description,
						},
					});

					let storeItemId;

					if (existingStoreItem) {
						storeItemId = existingStoreItem.id;
					} else {
						const newStoreItem = await StoreItem.create({
							description,
							amount: netContent,
							units: contentUnit,
							imageLink,
						});
						storeItemId = newStoreItem.id;
					}

					if (storeItemId) {
						await StoreItemPrice.create({
							storeItemId,
							price,
							dateTime: dayjs().startOf("day").format(),
						});
					}

					console.log(existingStoreItem);
				}
			})
			.catch((err) => console.log(err));
	}
}

function requestAldi(url) {}

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
