const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
