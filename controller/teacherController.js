const Teacher = require("../models/Teacher")
const Review = require("../models/Review")
const Student = require("../models/Student")

// adding a teacher requires : name , [reviews]
// not required : dept, profileUrl, image, rate,
const addTeacher = async (req, res) => {
  try {
    // the data as you know
    const teacherRegData = req.body

    const teacher = new Teacher(teacherRegData)

    // saving
    await teacher.save()

    res.send({
      status: true,
      data: teacher,
    })
  } catch (e) {
    res.send({
      status: false,
      data: e.message,
    })
  }
}

// returning all the teacher reviews by Id
const getAllTeacherReviews = async (req, res) => {
  try {

    const teacherID = req.params.id

    const teacher = await Teacher.findById(teacherID)

    if (!teacher)
      throw new Error('Teacher is not found !')

    
    // getting all the reviews to this teacher
    // two ways to do this : append the review to the teacher's db and return it 
    // or : get all the "to" from the review db
    const prettyReviews = []
    const reviews = await Review.find({"to" : teacherID})

    // formatting the reviews with : name of the owner, rate given, and comment given
    for (const review of reviews) {

      // getting the names of the owner if exists
      const ownerID = review.owner

      const student = await Student.findById(ownerID)

      const studentName = student.name

      prettyReviews.push({
        name: studentName,
        comment: review.comment,
        rate: review.rate
      })
    }

    // 10 : 1 + 2 + 2 + 0 ==> 5//4 
    res.send({
      status: true,
      data: prettyReviews,
    })

  }catch(e) {
    res.send({
      status: false,
      data: e.message,
    })
  }
}

const getTeacherRate = async (req, res) => {
  try {

    const teacherID = req.params.id

    // it's a good idea to create a function to check if the teacher exists to avoid dups
    const teacher = await Teacher.findById(teacherID)

    if (!teacher)
      throw new Error("Teacher not found !")
    
    res.send({
      status: true,
      data: teacher.rate,
    })
    
  } catch (e) {
    res.send({
      status: false,
      data: e.message,
    })
  }

}
module.exports = {
  addTeacher,
  getAllTeacherReviews, 
  getTeacherRate
}
