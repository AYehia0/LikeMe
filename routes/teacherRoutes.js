const router = require("express").Router()
const controller = require("../controller/teacherController")

// add a teacher :
// TODO : add a middleware to check if it's the admin
router.post("/add-teacher", controller.addTeacher)

module.exports = router
