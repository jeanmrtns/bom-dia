const axios = require('axios')
const jsonpath = require('jsonpath')

export class RequestPhrase {
	async execute(term: string) {
		try {
			const url = `https://pensador-api.vercel.app/?term=${term}&max=10`
			const response = await axios.get(url)
			const phrases = jsonpath.query(response.data, '$.frases[*].texto')
	
			const randomPhraseIndex = Math.floor(Math.random() * 10)
	
			const phrase = phrases[randomPhraseIndex]
			return phrase
		} catch (err) {
			console.error(err)
		}
	}
}


