const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String }
});

userSchema.pre('save', function(done) {
  const user = this;

  if (!user.isModified('password')) { return done(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return done(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return done(err); }

      user.password = hash;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, match) => {
    done(err, match);
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
