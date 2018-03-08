const express = require('express');
const morgan = require('morgan');

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
