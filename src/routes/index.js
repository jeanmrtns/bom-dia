const express = require('express')
const RequestImage = require('../use-cases/request-image')
const ManageImage = require("../use-cases/manage-image")
const { requestPhrase } = require('../use-cases/request-phrase')
const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme } = req.body
  const { term } = req.query
  const requestImage = new RequestImage()
  const manageImage = new ManageImage()
  
  const phrase = await requestPhrase(term)
  await requestImage.execute(imageTheme)
  await manageImage.execute(phrase)

	return res.status(200).json({ status: 'ok' })
})

routes.get('/phrase', async (req, res) => {
	try {
		const { term } = req.query
		const phrase = await requestPhrase(term)
		res.json(phrase)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Erro ao processar a solicitação' })
	}
})


routes.post("/user", async (req, res) => {
  const { imageTheme } = req.body
  const requestImage = new RequestImage()
  const imageLink = await requestImage.execute(imageTheme)

  return res.json({
    imageLink
  })
})

module.exports = routes
