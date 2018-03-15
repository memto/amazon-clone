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

// connect db
mongoose.connect(secret.getDbUri(), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
  return 0;
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

const mainController = require('./controllers/main');
const authenController = require('./controllers/authentication');
const accountController = require('./controllers/account');

app.use('/', mainController);
authenController(app);
accountController(app);

app.listen(secret.serverPort, (err) => {
  if (err) throw err;

  console.log(`server is listening on port ${secret.serverPort}`);
});
