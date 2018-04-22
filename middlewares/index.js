const Cart = require('../models/cart');

const countCartItems = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ owner: req.user.id }, (err, cart) => {
      if (err) return next(err);

      if (cart) {
        let total = 0;
        for (let i = 0; i < cart.items.length; i++) {
          const item = cart.items[i];
          total += item.quantity;
        }
        res.locals.cart = { id: cart._id, nItems: total };
      }

      return next();
    });
  } else {
    next();
  }
};

module.exports = {
  countCartItems,
};

