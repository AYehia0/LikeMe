const router = require("express").Router()
const controller = require("../controller/teacherController")

// add a teacher :
// TODO : add a middleware to check if it's the admin
router.post("/add-teacher", controller.addTeacher)
router.get("/get-reviews/:id", controller.getAllTeacherReviews)
router.get("/rate/:id", controller.getTeacherRate)

module.exports = router
