const router = require("express").Router()
const controller = require("../controller/studentController")
const idMiddle = require("../middlewares/studentAuth")

// identify student
router.post("/student", controller.addStudent)

// add review
router.post("/add-review/:id", idMiddle, controller.addReview)

module.exports = router
