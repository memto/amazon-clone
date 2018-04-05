const productSearch = require('./product-search');

module.exports = (app) => {
  app.use('/search', productSearch);
};
