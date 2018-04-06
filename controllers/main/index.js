const router = require('express').Router();
const Product = require('../../models/product');

function pagination(req, res, next) {
  const perPage = 9;
  const { page } = req.params;

  if (!page) {
    return res.redirect('/page/1');
  }

  return Product
    .find({})
    .skip(perPage * page)
    .limit(perPage)
    .populate('category')
    .exec((err, products) => {
      if (err) return next(err);

      return Product.count().exec((errCount, count) => {
        if (errCount) return next(errCount);

        const pages = count / perPage;
        return res.render('main/products-main', { products, pages, page });
      });
    });
}

router.get('/', (req, res, next) => {
  if (req.user) {
    return pagination(req, res, next);
  }
  return res.render('main/home');
});

router.get('/page/:page', (req, res, next) => {
  if (req.user) {
    return pagination(req, res, next);
  }
  return res.render('main/home');
});

router.get('/about', (req, res) => {
  res.render('main/about');
});

module.exports = router;
