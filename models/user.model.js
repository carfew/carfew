const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  accountType: {
    type: String,
  },
  name: {
    type: String, required: true,
  },
  username: {
    type: String, required: true, unique: true, uniqueCaseInsensitive: true,
  },
  email: {
    type: String, required: true, unique: true, uniqueCaseInsensitive: true,
  },
  password: {
    type: String, required: true, select: false
  },
  photoUrl: {
    type: String, required: true, select: false
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function createUser(next) {
  // Make createdAt and updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // Password Encryption
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return null;
});

UserSchema.pre('update', function updateTime() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

UserSchema.methods.comparePassword = function hashPass(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
