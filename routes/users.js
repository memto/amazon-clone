const router = require('express').Router();
const User = require('../models/users');

router.get('/signup', (req, res) => {
  res.render('acount/signup');
});

router.post('/signup', (req, res, next) => {
  const { email } = req.body;
  if (email) {
    User.findOne({ email }, (err, existUser) => {
      if (err) return next(Error('Database Error'));

      if (existUser) {
        console.log(`${email} is already existed`);

        return res.redirect('signup');
      }

      const user = new User();
      user.profile.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;

      return user.save((errSave) => {
        if (errSave) return next(errSave);

        res.json('user created successfully');
        return next();
      });
    });
    return 0;
  }
  console.log('email field is required');
  return res.redirect('signup');
});

module.exports = router;
