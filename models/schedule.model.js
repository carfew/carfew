const mongoose = require('mongoose');

const { Schema } = mongoose;

const Schedule = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    passenger: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    driver: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    origin: { type: String, },
    distance: { type: Number, },
});


Schedule.pre('save', async (next) => {
    // Make createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    // user.groups.unshift(this.id);
    }
    next();
});

Schedule.pre('update', function updateTime() {
    this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Group', Schedule);
