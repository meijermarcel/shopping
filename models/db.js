const Sequelize = require('sequelize');

var db_url = '';
let db;

if (process.env.NODE_ENV === 'production') {
    db_url = process.env.DATABASE_URL;
    db = new Sequelize(db_url, {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
} else {
    // db_url = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_LOCAL_URL;
    db_url = process.env.DATABASE_LOCAL_URL;
    db = new Sequelize(db_url, {
        dialect: 'postgres',
        logging: console.log
    });
}

module.exports = db;