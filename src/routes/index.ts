import express from 'express'
import { RequestImage } from '../use-cases/request-image'
import { RequestPhrase } from '../use-cases/request-phrase'
import { ManageImage } from '../use-cases/manage-image'

const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme, term } = req.body
  const requestImage = new RequestImage()
  const manageImage = new ManageImage()
  const requestPhrase = new RequestPhrase()
  
  const phrase = await requestPhrase.execute(term)  
  await requestImage.execute(imageTheme)  
  await manageImage.execute(phrase)

	return res.status(200).json({ status: 'ok' })
})

routes.post("/user", async (req, res) => {
  // TODO
})

export { routes }
