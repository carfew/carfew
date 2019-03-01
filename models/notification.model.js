const mongoose = require('mongoose');

const { Schema } = mongoose;

const Notification = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    rider: {
        type: Schema.Types.ObjectId, required: true, ref: 'User'
    },
    driver: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    userRead: {
        type: Boolean
    },
    driverRead: {
        type: Boolean
    }
});

Notification.pre('save', async (next) => {
    // Make postedAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

Notification.pre('update', function updateTime() {
    this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Notification', Notification);
