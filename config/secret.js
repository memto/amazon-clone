module.exports = {
  dbUser: 'root',
  dbPassword: 'pW20081790',

  getDbUri() {
    return `mongodb://${this.dbUser}:${this.dbPassword}@ds261138.mlab.com:61138/amazonclone`;
  },

  secretKey: 'gnad@@#@$@!',

  serverPort: 3000,
};

