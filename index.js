const Promise = require('bluebird');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');

global.Promise = Promise;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const router = express.Router();

const aldiController = require('./controllers/aldiController');

const { init } = require('./services/initService.js');

init();

app.use(compression());
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

app.use(
    cors({
        credentials: false
    })
);

app.use(bodyParser.json());
app.use(methodOverride());

aldiController.init(router);
// console.log(aldiController);

// router.get('/aldi', async (req, res) => {
//     res.send('Hello, Aldi!');
// });

app.use('/api', router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('🚀 Express server listening on port ' + port);
});

module.exports = app;
