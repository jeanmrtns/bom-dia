require('dotenv').config()
const express = require("express")
const cors = require("cors")
const routes = require("./routes/index")

const PORT = 3333

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})