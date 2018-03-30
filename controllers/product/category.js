const router = require('express').Router();
const Category = require('../../models/category');

router.get('/add-category', (req, res, next) => {
  if (!req.user) return res.redirect('/login');

  return res.render('product/category', { error: req.flash('error'), message: req.flash('message') });
});

router.post('/add-category', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    req.flash('error', 'Name field is required');
    return res.redirect('/add-category');
  }

  return Category.findOne({ name }, (errFind, category) => {
    if (errFind) return next(errFind);

    if (category) {
      req.flash('error', 'Existed category');
      return res.redirect('/add-category');
    }

    const newCategory = new Category();
    newCategory.name = req.body.name;
    return newCategory.save((err) => {
      if (err) return next(err);

      req.flash('message', 'Added new catefory successfuly');
      return res.redirect('/add-category');
    });
  });
});

module.exports = router;
