const router = require('express').Router();
const faker = require('faker');
const async = require('async');
const { Category } = require('../models/category');
const Product = require('../models/product');

router.post('/search', (req, res, next) => Product.search({
  query_string: { query: req.body.search_term },
}, (err, results) => {
  if (err) return next(err);

  return res.json(results);
}));

router.get('/:name', (req, res, next) => {
  async.waterfall(
    [
      (callback) => {
        Category.findOne({ name: req.params.name }, (err, category) => {
          if (err) return next(err);

          if (category) { return callback(null, category); }

          return callback('Category not exist');
        });
      },
      (category, callback) => {
        for (let i = 0; i < 30; i++) {
          const newProduct = new Product();

          newProduct.category = category._id;
          newProduct.name = faker.commerce.productName();
          newProduct.price = faker.commerce.price();
          newProduct.image = faker.image.image();

          newProduct.save();
          return callback(null, category);
        }
      },
    ],
    (err, category) => {
      if (err) return next(err);

      return res.json(`Add Products into ${category.name} successfully`);
    },
  );
});

router.get('/promise/:name', (req, res, next) => {
  new Promise((resolve, reject) => {
    Category.findOne({ name: req.params.name }, (err, category) => {
      if (err) return next(err);

      if (category) {
        console.log(`got category ${category.name}`);
        resolve(category);
      } else {
        reject(`Category ${req.params.name} not exist`);
      }
    });
  })
  .then((category) => {
    let count = 0;
    for (count; count < 2; count++) {
      const newProduct = new Product();

      newProduct.category = category._id;
      newProduct.name = faker.commerce.productName();
      newProduct.price = faker.commerce.price();
      newProduct.image = faker.image.image();

      newProduct.save();
    }
    return ({ category, count });
  })
  .then(({ category, count }) => res.json(`Add ${count} Products into ${category.name} successfully ${Math.random()}`))
  .then(result => console.log(`onFullFilled after return res.json ${result}`))
// .catch(reason => next());
  .catch(reason => next(reason));
  // .finally(function() { console.log('onFinally'); });
});

router.get('/promise/:name', (req, res, next) => {
  console.log('/promise/:name 2 route');
  return res.json('/promise/:name 2 route');
});

module.exports = router;
