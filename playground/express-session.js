const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use((req, res, next) => {
  // req.session = { user: { name: 'abc' } };
  req.aaa = {};
  return session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore(),
  })(req, res, next);
});

app.use((req, res, next) => {
  req.session.abc = 1000;
  return next();
});

app.use((req, res, next) => {
  req.session.abc += 1000;
  return next();
});

app.get('/', (req, res, next) => {
  if (typeof req.session.views === 'undefined') {
    req.session.views = 0;
    return res.end('Welcome to the file session demo. Refresh page!');
  }
  return next();
});

app.get('/', (req, res, next) => {
  req.session.views += 1;
  if (req.session.views >= 1) {
    req.session.abc += 1000;
    return res.redirect('/abc');
  }
  return next();
});
app.use((req, res, next) => {
  console.log('req.session', req.session);
  return next();
});
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p>views: ${req.session.views}</p>\n`);
  res.end();
  req.session.abc += 500;
  return 0;
});
app.get('/abc', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p>views from abc: ${req.session.abc}</p>\n`);
  res.end();
  req.session.abc += 500;
  return 0;
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('server is listening on port 3000');
});
