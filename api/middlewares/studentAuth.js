/*

This is a middleware to identifiy the student by their IP address, i know it's a stupid thing but mehhhh

*/
const jwt = require("jsonwebtoken")
const Student = require("../models/Student")

const identifiyStudent = async (req, res, next) => {
  try {
    // the token should be sent with the headers

    const sentToken = req.header("Authorization").replace("Bearer ", "")

    // check if it's a valid one
    const valid = jwt.verify(sentToken, process.env.JWTSECRET)

    // getting the ip Address, weird huh
    const ipAddress = valid.ipaddr

    // checking if it's already there or not
    const student = await Student.findOne({
      ipaddr: ipAddress,
      token: sentToken,
    })

    if (!student) throw new Error("WTF is going on here ?!!")

    req.student = student
    req.token = sentToken

    next()
  } catch (e) {
    res.send(e.message)
  }
}

module.exports = identifiyStudent
