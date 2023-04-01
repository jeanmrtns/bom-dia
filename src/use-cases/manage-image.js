const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

class ManageImage {
    //41 char por linha
    //35 char por linha considerando padding
    //13 linhas no maximo
    async execute(phrase){

        try {
            loadImage("./tmp/output.png").then((image) => {
                
                // phrase = 'O amor começa quando uma pessoa se sente só e termina quando uma pessoa deseja estar só.'
                // phrase = 'Se você fosse uma música seria as melhores notas'
                console.log(phrase);
                let lines = phrase.match(/.{1,35}(\s|$)/g);
                let new_phrase = lines.join("\n");
                let number_lines = lines.length
                let bottom_padding = 10
                let y_pos_phrase = (image.height-(45*number_lines)) - bottom_padding

                const canvas = createCanvas(image.width, image.height);
                const context = canvas.getContext("2d");
                
                context.fillStyle = "white";
                context.fillRect(0, 0, image.width, image.height);
                context.drawImage(image, 0, 0);
                context.font = "bold 48px Courier";
                context.shadowColor = "rgb(0, 0, 0)";
                context.shadowBlur = 10;
                context.strokeStyle = "rgb(0, 0, 0)";
                context.strokeText(new_phrase, 75-1, y_pos_phrase-1)
                context.fillStyle = "rgb(212, 66, 245)";
                context.fillText(new_phrase, 75, y_pos_phrase);
    
                const buffer = canvas.toBuffer("image/png");
                fs.writeFileSync("./tmp/saida.png", buffer);
    
                console.log("Imagem criada");
            });
        }catch(error){
            console.log("error");
        }

    }

}

module.exports = ManageImage