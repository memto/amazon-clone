const router = require('express').Router();
const User = require('../models/users');

router.post('/add', (req, res, next) => {
  const user = new User();
  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save((err) => {
    if (err) return next(err);

    res.json('user created successfully');
    return next();
  });
});

module.exports = router;
