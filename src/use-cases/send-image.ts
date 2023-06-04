import axios from 'axios'
import fs from 'fs'
import FormData from "form-data";

const senderId = process.env.WPP_SENDER_ID;

export class SendImage {
    async send(phoneNumber: String){
        try {
            const accessToken = process.env.WPP_KEY
            const formData = new FormData();

            formData.append("file", fs.createReadStream("tmp/saida.png"), { contentType: "image/png"});
            formData.append("messaging_product", "whatsapp");
            const uploadRequest = await axios.post(
                `https://graph.facebook.com/v17.0/${senderId}/media`,
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
                "to": `55${phoneNumber}`,
                "type": "image",
                "image": {
                    "id" : mediaId
                }
            }
			const url = `https://graph.facebook.com/v17.0/${senderId}/messages`;
			await axios.post(url, body, config);
            await axios.delete(`https://graph.facebook.com/v17.0/${mediaId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
		} catch (err) {
			console.error(err)
		}
    }
}