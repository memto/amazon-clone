const router = require('express').Router();
const Category = require('../../models/category');

router.get('/add-category', (req, res, next) => {
  if (!req.user) return res.redirect('/login');

  return res.render('product/category', { error: req.flash('error'), message: req.flash('message') });
});

router.post('/add-category', (req, res, next) => {
  if (!req.body.name) {
    req.flash('error', 'Name field is required');
    return res.redirect('/add-category');
  }

  const category = new Category();
  category.name = req.body.name;
  return category.save((err) => {
    if (err) return next(err);

    req.flash('message', 'Added new catefory successfuly');
    return res.redirect('/add-category');
  });
});

module.exports = app => app.use(router);
