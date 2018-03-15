const login = require('./login');
const signup = require('./signup');

module.exports = (app) => {
  app.use(login);
  app.use(signup);
};

