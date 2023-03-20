const express = require("express")
const RequestImage = require("../use-cases/request-image")
const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme } = req.body
  const requestImage = new RequestImage()
  const imageLink = await requestImage.execute(imageTheme)

  return res.json({
    imageLink
  })
})

module.exports = routes