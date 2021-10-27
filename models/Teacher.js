const mongoose = require("mongoose")

const Schema = mongoose.Schema

/*

Name : Something 
dept : Working at which college department
profileUrl : if they have any external Urls like FB, etc..
image : a string stores the location to their profile pic : add a default pic if not found 
rate : how much students like them ?

*/
const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  dept: {
    type: String,
    required: true,
    enum: ["CSE", "CONTROL", "COMM", "OTHER"],
    default: "OTHER",
  },
  profileUrl: {
    type: String,
  },
  image: {
    type: String,
  },
  rate: {
    type: Number,
    default: 0,
  },
})

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher
