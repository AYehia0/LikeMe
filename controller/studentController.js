const Student = require("../models/Student")
const jwt = require("jsonwebtoken")

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
    if (e.message.startsWith("E11000")) console.log("it's there")
    return res.send({
      status: false,
      data: "Error : it's already registered",
    })

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

    res.send("Hi")
  } catch (e) {
    res.send(e.message)
  }
}

module.exports = {
  addReview,
  addStudent,
}
