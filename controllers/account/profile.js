const router = require('express').Router();

router.get('/profile', (req, res) => {
  if (req.user) {
    return res.render('account/profile');
  }

  return res.redirect('login');
});

module.exports = router;
