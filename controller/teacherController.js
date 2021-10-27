const Teacher = require("../models/Teacher")

// adding a teacher requires : name , [reviews]
// not required : dept, profileUrl, image, rate,
const addTeacher = async (req, res) => {
  try {
    // the data as you know
    const teacherRegData = req.body

    const teacher = new Teacher(teacherRegData)

    // saving
    await teacher.save()

    res.send(teacher)
  } catch (e) {
    res.send(e.message)
  }
}

module.exports = {
  addTeacher,
}
