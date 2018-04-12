const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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

app.set('view engine', 'ejs');

// Middleeare
app.use(morgan('dev'));
app.use(cookieParser('GNAD0991'));
app.use(session({
  key: 'app.sid',
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test', (req, res) => {
  res.render('test');
});

app.get('/test-result', (req, res) => {
  res.send(req.query);
});

app.get('/counter', (req, res, next) => {
  console.log(req.cookies);

  new Promise((resolve, reject) => {
    const result = Math.random();
    console.log(`promise run ${result}`);
    if (result > 0.3) {
      if (result > 0.8) return next(result);
      const { count } = req.signedCookies;
      resolve(count);
    } else {
      reject(result);
    }
  }).then((count) => {
    let newCount;
    if (count) {
      newCount = Number(count) + 1;
    } else {
      newCount = 0;
    }
    res.cookie('count', newCount, {
      signed: true,
    });

    res.send(`count: ${newCount}`);
  })
    .catch((reason) => {
      console.log(`onRejected ${reason}`);
      // next(`onRejected ${reason}`);
      // next();
      res.send(`onRejected ${reason}`);
    });
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('server is listening on port 3000');
});
