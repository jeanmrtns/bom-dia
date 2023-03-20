const express = require("express")
const cors = require("cors")

const PORT = 3333

const app = express()
app.use(express.json())
app.use(cors())

app.get("/custom-image", (req, res) => {
  return res.json({
    message: "Ok"
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})