const router = require('express').Router();
const User = require('../../models/user');
const Cart = require('../../models/cart');

router.get('/signup', (req, res) => {
  // console.log("===");
  // console.log('===cookies===', req.cookies);
  // console.log('===session===', req.session);
  // console.log('===flash===', req.flash());

  if (req.user) return res.redirect('/');

  return res.render('authentication/signup', { errors: req.flash('errors') });
});

router.post('/signup', (req, res, next) => {
  const { email } = req.body;
  if (email) {
    new Promise((resolve, reject) => {
      User.findOne({ email }, (err, user) => {
        if (err) return next(Error('Database error on find user'));

        if (user) {
          req.flash('errors', 'User with the email already existed');
          return res.redirect('signup');
        }

        const newUser = new User();
        newUser.profile.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.profile.picture = newUser.gravatar();

        return newUser.save((saveErr) => {
          if (saveErr) return next('Database error on save user');

          return resolve(newUser);
        });
      });
    })
      .then((user) => {
        const newCart = new Cart();
        newCart.owner = user._id;
        newCart.items = [];
        return newCart.save((saveErr) => {
          if (saveErr) return next('Database error on save cart');

          return req.logIn(user, (errLogIn) => {
            if (errLogIn) return next(errLogIn);

            return res.redirect('/profile');
          });
        });
      })
      .catch((reason) => {
      //
      });
  } else {
    req.flash('errors', 'Email field is required');
    return res.redirect('signup');
  }

  return 'make eslint consistent-return happy';
});

module.exports = router;
