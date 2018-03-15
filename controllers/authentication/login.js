const router = require('express').Router();
const passport = require('passport');
require('../../config/passport');

router.get('/login', (req, res) => {
  if (req.user) return res.redirect('/');

  return res.render('authentication/login', { loginMessage: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
