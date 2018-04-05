const router = require('express').Router();
const Product = require('../../models/product');


router.post('/', (req, res, next) => {
  const queryString = req.body.q;
  res.redirect(`/search?q=${queryString}`);
});

router.get('/', (req, res, next) => {
  if (req.query.q) {
    const queryString = req.query.q;

    return Product.search({
      query_string: { query: req.query.q },
    }, (err, results) => {
      if (err) return next(err);

      const data = results.hits.hits.map(hit => hit);

      // return res.json(data);
      return res.render('search/search-result', { queryString, data });
    });
  }

  return Product.search({ match_all: {} }, (err, results) => {
    if (err) return next(err);

    const data = results.hits.hits.map(hit => hit);

    // return res.json(data);
    return res.render('search/search-result', { queryString: null, data });
  });
});

module.exports = router;
