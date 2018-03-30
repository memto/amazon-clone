const category = require('./category');
const product = require('./product');

module.exports = (app) => {
  app.use('/category', category);
  app.use('/product', product);
};
