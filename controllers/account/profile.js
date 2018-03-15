const router = require('express').Router();

router.get('/profile', (req, res) => {
  if (req.user) {
    return res.render('account/profile', { user: req.user });
  }

  return res.redirect('login');
});

module.exports = router;
