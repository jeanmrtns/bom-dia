import express from 'express'
import { RequestImage } from '../use-cases/request-image'
import { RequestPhrase } from '../use-cases/request-phrase'
import { ManageImage } from '../use-cases/manage-image'
import { SendImage } from '../use-cases/send-image'
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const routes = express.Router()

routes.post("/custom-image", async (req, res) => {
  // const { imageTheme, term } = req.body
  const requestImage = new RequestImage()
  const manageImage = new ManageImage()
  const requestPhrase = new RequestPhrase()
  const sendImage = new SendImage()
 
  const users = await prisma.user.findMany()

  users.forEach(async (user) => {
    const { phraseTheme, pictureTheme, phone } = user
    
    const phrase = await requestPhrase.execute(phraseTheme)
    await requestImage.execute(pictureTheme)  
    await manageImage.execute(phrase)
    await sendImage.send()
  })

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
  try {
    const user = await prisma.user.create({
      data: req.body,
    })
    const id = user.id
    const token = jwt.sign({ id }, String(process.env.SECRET), {
      expiresIn: 3600
    });
    return res.status(200).json({user, token})  
  }
  catch (err) {
    return res.status(500).json({mensagem: "Não foi possível cadastrar o usuário.", erro: err})  
  }
})

routes.get("/user", async (req, res) => {
  const users = await prisma.user.findMany()
  return res.status(200).json(users)
})

routes.get("/user-by-token", async (req, res) => {
  const result = await auth(req.headers.authorization)
  if (!result.auth) {
    return res.status(500).json(result.message);
  }
  const user = await prisma.user.findFirst({where: {id: result.userId}})
  return res.status(200).json(user)
})

routes.post('/login', async (req, res) => {
  const user = await prisma.user.findUnique({where: {phone: req.body.phone}})
  
  if (!user) {
    return res.status(404).json({message: 'Telefone não encontrado!'});
  }

  if(req.body.phone === user.phone && req.body.password === user.password){
    const id = user.id
    console.log(id)
    const token = jwt.sign({ id }, String(process.env.SECRET), {
      expiresIn: 3600
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
})

routes.put('/user/:id', async (req, res) => {
  const result = await auth(req.headers['authorization'])
  if (!result.auth) {
    return res.status(500).json(result.message);
  } 

  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      phone: req.body.phone,
      name: req.body.name,
      pictureTheme: req.body.pictureTheme,
      phraseTheme: req.body.phraseTheme
    },
  })
  return res.status(200).json(updateUser);
})

async function auth(token: string | undefined) {
  let user
  if (token) {
    jwt.verify(token.split(' ')[1], String(process.env.SECRET), function(err, decoded) {
      if (err) return { auth: false, message: 'Token não aceito.' }
    })
    let decoded: any = jwt.decode(token.split(' ')[1], {complete: true});
    let payload = decoded.payload.id
    //let user = payload?.user
    return { auth: true, message: 'Usuário autorizado.', userId: payload }
  }
  else {
    return { auth: false, message: 'Sem token de autenticação.' }
  }
}

export { routes }
