const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');

// connect db
mongoose.connect('mongodb://root:pW20081790@ds261138.mlab.com:61138/amazonclone', (err) => {
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

const mainRoute = require('./routes/main');
const usersRoute = require('./routes/users');

app.use('/', mainRoute);
app.use('/user', usersRoute);

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('server is listening on port 3000');
});
