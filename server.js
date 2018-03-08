const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const name = 'Dang';
  res.json(`My name is ${name}`);
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('server is listening on port 3000');
});
