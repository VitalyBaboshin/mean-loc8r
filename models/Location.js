const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, default: Date.now}
})

const openingTimeSchema = new Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
})
const openingTime = model('openingTime', openingTimeSchema)

const locationSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    rating: {type: Number, 'default': 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
})
const location = model('location', locationSchema)

module.exports = {
    openingTime: openingTime,
    location: location
}
// module.exports = model('openingTime', openingTime);
// module.exports = model('reviewSchema', reviewSchema);
