const mongoose = require('mongoose');

const { Schema } = mongoose;

const Ride = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    rider: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    driver: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    origin: { type: Schema.Types.Mixed, required: true },
    // Define the pickup window start and end times
    pickupStart: { type: Date, required: true },
    pickupEnd: { type: Date, required: true },
    expiration: { type: Date },
    status: { type: String, required: true },
    rating: { type: Number },
});


Ride.pre('save', async (next) => {
    // Make createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    // user.groups.unshift(this.id);
    }
    next();
});

Ride.pre('update', function updateTime() {
    this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Group', Ride);