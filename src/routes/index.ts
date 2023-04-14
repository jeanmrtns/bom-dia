import express from 'express'
import { RequestImage } from '../use-cases/request-image'
import { RequestPhrase } from '../use-cases/request-phrase'
import { ManageImage } from '../use-cases/manage-image'
import { SendImage } from '../use-cases/send-image'

const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  const { imageTheme, term } = req.body
  const requestImage = new RequestImage()
  const manageImage = new ManageImage()
  const requestPhrase = new RequestPhrase()
  const sendImage = new SendImage()
  
  const phrase = await requestPhrase.execute(term)
  await requestImage.execute(imageTheme)  
  await manageImage.execute(phrase)
  await sendImage.send()

	return res.status(200).json({ status: 'ok' })
})

routes.get("/webhook", async (req, res) => {
  // editar a url do webhook com a nova url gerada pelo quick tunnel do cloudflare
  console.log(req.query);
  if(req.query['hub.verify_token'] == "eYToIYNYvbceshe"){
    console.log("ingual")
    return res.send(req.query['hub.challenge'])
  }
})

routes.post("/webhook", async (req, res) => {
  // cancelei a assinatura, se quiser usar dnv lembrar de assinar
  console.log("mensagem de " + req.body.entry[0].changes[0].value.messages[0].from);
  console.log("conteudo da mensagem: " + req.body.entry[0].changes[0].value.messages[0].text.body);
  return res.status(200).json({ status: 'ok' })
})

routes.post("/user", async (req, res) => {
  // TODO
})

export { routes }
