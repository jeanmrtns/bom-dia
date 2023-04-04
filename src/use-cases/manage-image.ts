import fs from 'fs'
import { createCanvas, loadImage } from "canvas";

export class ManageImage {
    //41 char por linha
    //35 char por linha considerando padding
    //13 linhas no maximo
    async execute(phrase: string) {
        try {
            const image = await loadImage("tmp/output.png")
            const lines = phrase.match(/.{1,35}(\s|$)/g)
            
            if (!lines) {
                throw new Error('Regex failed')
            }

            const new_phrase = lines.join("\n")
            const number_lines = lines.length
            const bottom_padding = 10
            const y_pos_phrase = (image.height - (45 * number_lines)) - bottom_padding

            const canvas = createCanvas(image.width, image.height)
            const context = canvas.getContext("2d")
            
            context.fillStyle = "white"
            context.fillRect(0, 0, image.width, image.height);
            context.drawImage(image, 0, 0)
            context.font = "bold 48px Courier"
            context.shadowColor = "rgb(0, 0, 0)"
            context.shadowBlur = 10
            context.strokeStyle = "rgb(0, 0, 0)"
            context.strokeText(new_phrase, 75-1, y_pos_phrase-1)
            context.fillStyle = "rgb(212, 66, 245)"
            context.fillText(new_phrase, 75, y_pos_phrase)

            const buffer = canvas.toBuffer("image/png")
            fs.writeFileSync("./tmp/saida.png", buffer)
            fs.unlinkSync("./tmp/output.png")
            
        } catch(error) {
            console.log(error)
        }
    }
}
