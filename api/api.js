const router = require('express').Router();
const faker = require('faker');
const async = require('async');
const Category = require('../models/category');
const Product = require('../models/product');

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

module.exports = router;
