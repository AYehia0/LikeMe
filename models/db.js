// Creating the connection to the database
const mongoose = require("mongoose")

const DB_NAME = process.env.DB_NAME || "TEST_DB"

const DB_URL = `mongodb://localhost:27017/${DB_NAME}`

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .catch((e) => {
    console.log(e.message)
  })
