const axios = require('axios')
import fs from 'fs'
import FormData from "form-data";

export class SendImage {
    async send(){
        try {
            const accessToken = "EAAbZB7Pov0w4BAHEZC26vWAZCZB4kPQFz7sUh1pXiFwAfTdl7gV127eIBfOTFFqAs3reblZBynLkdFEbH9CZC7q5XNMVTtpflDELRZCDxDHoLOmlZC83nmZCbbzVTA1MN1l4esx0EiR7lNeOmBExD2tVZAwUX8esZAZBmdu3AwLpMpcZCxmq0aOf0XK4POdUzpQJRXo4EFBBZBYMxt5AZDZD"
            const formData = new FormData();

            formData.append("file", fs.createReadStream("tmp/saida.png"), { contentType: "image/png"});
            formData.append("messaging_product", "whatsapp");
            const uploadRequest = await axios.post(
                `https://graph.facebook.com/v14.0/115781484817417/media`,
                formData,
                {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // "Bearer" prefix
                    ...formData.getHeaders(), // merge in FormData headers
                },
                }
            );
            const mediaId = uploadRequest.data.id
            console.log("media ID", mediaId);
			const config = {
				headers:{
				  Authorization: `Bearer ${accessToken}`,
				  'Content-Type': 'application/json'
				}
			};
            const body = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "5519989273515",
                "type": "image",
                "image": {
                    "id" : mediaId
                }
            }
			const url = `https://graph.facebook.com/v16.0/115781484817417/messages`
			const sendImageMessage = await axios.post(url, body, config)
            console.log(sendImageMessage.data);

            // const deleteImage = await axios.get(`https://graph.facebook.com/v16.0/${mediaId}`, { headers: { Authorization: accessToken } }) //dando erro
            // console.log(deleteImage.data);
            
		} catch (err) {
			console.error(err)
		}
    }
}