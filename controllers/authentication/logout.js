const router = require('express').Router();

router.get('/logout', (req, res, next) => {
  req.logOut();
  return res.redirect('/');
});

module.exports = router;
