const axios = require('axios')
const jsonpath = require('jsonpath')

export class RequestPhrase {
	async execute(term: string) {
		try {
			const config = {
				headers:{
				  Authorization: `Bearer ${process.env.OPENAI_KEY}`,
				  'Content-Type': 'application/json'
				}
			};
			const url = `https://api.openai.com/v1/chat/completions`
			const response = await axios.post(url, 
				{
					"model": "gpt-3.5-turbo",
					"messages": [{"role": "user", "content": `Retorne uma frase de ${term}`}],
					"temperature": 0.7,
					"max_tokens": 150
			  	},
			  	config
			)
			const phrase = jsonpath.query(response.data, '$.choices[0].message.content')
			return phrase[0]
		} catch (err) {
			console.error(err)
		}
	}
}


