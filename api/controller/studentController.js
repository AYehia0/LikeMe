const Student = require("../models/Student")
const jwt = require("jsonwebtoken")
const Teacher = require("../models/Teacher")
const Review = require("../models/Review")

// adding a student to the db
const addStudent = async (req, res) => {
  try {
    // the data contains : name and IP address
    const { name } = req.body

    // getting the ip automatically using using the server nodejs socket
    ipaddr = req.socket.remoteAddress

    // creating the token
    const token = jwt.sign({ ipaddr: ipaddr }, process.env.JWTSECRET)

    // creating a user
    const student = new Student({ name, ipaddr, token })

    await student.save()

    // user is created !!
    res.send(student)
  } catch (e) {
    if (e.message.startsWith("E11000")) {
      return res.send({
        status: false,
        data: "Error : it's already registered",
      })
  }
    res.send({
      status: false,
      data: e.message,
    })

  }
}

const addReview = async (req, res) => {
  try {
    // data contains owner , comment , rate
    const reviewData = req.body

    // getting the student ID : used to create a review
    const studentID = req.student._id
    const teacherID = req.params.id

    // checking if the teacher exists in the db
    const teacherExists = await Teacher.findById(teacherID)

    if (!teacherExists)
      throw new Error("Teacher not found !")

    // adding the review
    const newReview = new Review({
      owner: studentID,
      to: teacherID,
      comment: reviewData.comment,
      rate: reviewData.rate
    })

    // saving 
    await newReview.save()

    // updating rates, TODO: check if appending the reviews to the teacher is better than fetching it from the Review table
    const allReviews = await Review.find({"to": teacherID})

    // new rate = all rates // number of rates  <= 10
    // probably not the fastest thing but meh it works for that app 
    const newRate = allReviews.map(review => review.rate).reduce((sum, current) => sum + current, 0)

    // saving the new rate
    await Teacher.findByIdAndUpdate(teacherID, {$set: {rate : parseInt(newRate/allReviews.length)}})

    res.send(newReview)
  } catch (e) {
    if (e.message.startsWith("E11000")) {
      return res.send({
        status: false,
        data: "You can't review this teacher",
      })
  }
    res.send({
      status: false,
      data: e.message,
    })

  }
}

module.exports = {
  addReview,
  addStudent,
}
