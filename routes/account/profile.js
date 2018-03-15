const router = require('express').Router();

router.get('/profile', (req, res) => res.render('account/profile'));

module.exports = router;
