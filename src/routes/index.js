const express = require("express")
const RequestImage = require("../use-cases/request-image")
const ManageImage = require("../use-cases/manage-image")
const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme } = req.body
  const requestImage = new RequestImage()
  const manageImage = new ManageImage()

  await requestImage.execute(imageTheme)
  await manageImage.execute()

  return res.status(200).json({ status: "ok" })
})

module.exports = routes