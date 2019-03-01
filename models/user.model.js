const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    accountType: {
        type: String,
    },
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    username: {
        type: String, required: true, unique: true, uniqueCaseInsensitive: true,
    },
    email: {
        type: String, required: true, unique: true, uniqueCaseInsensitive: true,
    },
    phone: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true, select: false
    },
    photoUrl: {
        type: String, select: false
    },
    // Ride object and a bool that shows whether notification has been read or not
    notifications: [{
        type: Schema.Types.Mixed, default: []
    }],
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
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
    return null;
});

UserSchema.methods.updateNotifications = function notify() {
    // this needs to update Read attribute in notifications
}

UserSchema.pre('update', function updateTime() {
    this.update({}, { $set: { updatedAt: new Date() } });
});

UserSchema.methods.comparePassword = function hashPass(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
