const express = require("express")
const RequestImage = require("../use-cases/request-image")
const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme } = req.body
  const requestImage = new RequestImage()
  await requestImage.execute(imageTheme)

  return res.status(200).json({ status: "ok" })
})

module.exports = routes