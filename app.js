require("./models/db")
const express = require("express")

// the routes
const studentRouter = require("./routes/studentRoutes")
const teacherRouter = require("./routes/teacherRoutes")

const app = express()

app.use(express.json())

// using the routes
app.use(studentRouter)
app.use(teacherRouter)

module.exports = app
