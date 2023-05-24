import axios from 'axios'
import { parseCookies } from 'nookies'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

const cookies = parseCookies()
api.defaults.headers.common.authorization = `Bearer ${cookies['@bomdia:token']}`
