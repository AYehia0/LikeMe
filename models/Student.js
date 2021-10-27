const mongoose = require("mongoose")

const Schema = mongoose.Schema

/*
Student has a name or anonymous user 
ipaddr is the ip address of the student 

NOTES : avoid spamming by limitting each user with only one review for one teacher.
*/
const studentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 40,
    default: "anon",
  },
  ipaddr: {
    type: String,
    trim: true,

    // properly it's a bad idea idk lol
    unique: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student
