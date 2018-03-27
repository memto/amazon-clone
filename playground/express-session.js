const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use((req, res, next) => {
  console.log('got new request');
  return next();
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use((req, res, next) => session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore({ path: '../../sessions' }),
})(req, res, next));

app.get('/', (req, res, next) => {
  if (typeof req.session.views === 'undefined') {
    req.session.abc = 2000;
    req.session.views = 0;
    return res.end('Welcome to the file session demo. Refresh page!');
  }
  return next();
});

app.get('/', (req, res, next) => {
  req.session.views += 1;
  if (req.session.views >= 1) {
    req.session.aaaaa = Math.random();
    return res.redirect('/abc');
  }
  return next();
});
app.use((req, res, next) => {
  console.log('After redirect req.session', req.session);
  return next();
});
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p>views: ${req.session.views}</p>\n`);
  return res.end();
});
app.get('/abc', (req, res) => {
  if (req.session.abc === 2000) {
    const temp = req.session.abc;
    req.session.views = undefined;
    req.session.abc = 1000;
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<p>views from abc: ${temp}</p>\n`);
  }
  return res.redirect('/');
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('server is listening on port 3000');
});
