module.exports = {
  dbUser: '',
  dbPassword: '',

  getDbUri() {
    // return `mongodb://${this.dbUser}:${this.dbPassword}@ds261138.mlab.com:61138/amazonclone`;
    return 'mongodb://localhost:27017/amazonclone';
  },

  secretKey: 'gnad@@#@$@!',

  serverPort: 3000,
};

