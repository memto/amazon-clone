const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');

module.exports = (app) => {
  app.use(signup);
  app.use(login);
  app.use(logout);
};

