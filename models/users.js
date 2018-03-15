const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// create schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    name: {
      type: String,
      default: 'Anonymous',
    },
    picture: String,
  },
  address: { type: String, default: 'Unkown' },
  history: [{
    date: Date,
    paid: { type: Number, default: 0 },
    // items: { type: Schema.Types.ObjectId, ref: '' },
  }],
});

// hash the password
UserSchema.pre('save', function cbPre(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch(err => next(err));
});

// compare password
UserSchema.methods.comparePassword = function cp(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    this.size = 200;
  } else {
    this.size = size;
  }

  if (!this.email) return `https://gravatar.com/avatar/?s${this.size}&d=retro`;
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s${this.size}&d=retro`;
};


module.exports = mongoose.model('User', UserSchema);
