const router = require('express').Router();
const User = require('../models/users');

router.get('/signup', (req, res) => {
  // console.log("===");
  // console.log('===cookies===', req.cookies);
  // console.log('===session===', req.session);
  // console.log('===flash===', req.flash());
  res.render('acount/signup', { errors: req.flash('errors') });
});

router.post('/signup', (req, res, next) => {
  const { email } = req.body;
  if (email) {
    User.findOne({ email }, (err, existUser) => {
      if (err) return next(Error('Database Error'));

      if (existUser) {
        req.flash('errors', 'Email already existed');

        return res.redirect('signup');
      }

      const user = new User();
      user.profile.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;

      return user.save((errSave) => {
        if (errSave) return next(errSave);

        return res.redirect('/'); // should be redirect to profile
      });
    });
    return 0;
  }
  req.flash('errors', 'Email field is required');
  return res.redirect('signup');
});

module.exports = router;
