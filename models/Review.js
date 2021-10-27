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
  },
  rate: {
    type: Number,
    required: true,
  },
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
