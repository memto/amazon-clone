const router = require('express').Router();
// const Category = require('../../models/category');
const Product = require('../../models/product');

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) return next(err);

    return res.render('product/single-product', { product });
  });
});

module.exports = router;
