import { createClient } from 'pexels'

export const pexels = createClient(String(process.env.PEXELS_API_KEY));
