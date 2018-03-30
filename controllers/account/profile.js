const router = require('express').Router();
const User = require('../../models/user');

router.get('/profile', (req, res) => {
  if (req.user) {
    return res.render('account/profile');
  }

  return res.redirect('login');
});

router.get('/edit-profile', (req, res) => {
  if (req.user) {
    return res.render('account/edit-profile', { editProfileMessage: req.flash('editProfileMessage') });
  }

  return res.redirect('login');
});

router.post('/edit-profile', (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) return next(err);

    const temp = user;

    if (req.body.name) temp.profile.name = req.body.name;
    if (req.body.address) temp.profile.address = req.body.address;

    return temp.save((errSave) => {
      if (errSave) return next(errSave);

      req.flash('editProfileMessage', 'Profile saved');
      return res.redirect('edit-profile');
    });
  });
});

module.exports = router;
