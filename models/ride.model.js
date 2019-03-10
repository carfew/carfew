const mongoose = require('mongoose');

const { Schema } = mongoose;

const Ride = new Schema({
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
    origin: {
        type: Schema.Types.Mixed, required: true
    },
    destination: {
        type: Schema.Types.Mixed, required: true
    },
    driveDetails: {
        type: Schema.Types.Mixed
    },
    // Define the pickup window start and end times
    pickupStart: {
        type: Date, required: true
    },
    // pickupEnd: { type: Date, required: true },
    expiration: {
        type: Date
    },
    // status options: posted, proposed, accepted, ongoing, completed
    status: {
        type: String, default: 'posted'
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    }
});

Ride.pre('save', async (next) => {
    // Make postedAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
        this.status = 'posted';
        // user.groups.unshift(this.id);
    }
    next();
});

Ride.pre('update', function updateTime() {
    this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Ride', Ride);
