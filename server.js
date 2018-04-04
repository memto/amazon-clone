const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const secret = require('./config/secret');

const Category = require('./models/category');
const Product = require('./models/product');

// connect db
mongoose.connect(secret.getDbUri(), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
  return 0;
});

Product.createMapping((err, mapping) => {
  if (err) {
    console.log('Mapping error');
    console.log(err);
  } else {
    console.log('Mapping created');
    console.log(mapping);
  }
});

const stream = Product.synchronize();
let count = 0;
stream.on('data', () => {
  count += 1;
});

stream.on('close', () => {
  console.log(`mapped ${count} documents`);
});

stream.on('error', (err) => {
  console.log(err);
});

const app = express();

// Middleeare
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.getDbUri(), autoReconnect: true }),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use((req, res, next) => {
  Category.find({}, (err, categories) => {
    if (err) return next(err);

    res.locals.categories = categories;
    return next();
  });
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

const mainController = require('./controllers/main');
const authenController = require('./controllers/authentication');
const accountController = require('./controllers/account');
const productController = require('./controllers/product');
const apiRoutes = require('./api/api');

app.use('/', mainController);
authenController(app);
accountController(app);
productController(app);
app.use('/api', apiRoutes);

app.listen(secret.serverPort, (err) => {
  if (err) throw err;

  console.log(`server is listening on port ${secret.serverPort}`);
});
