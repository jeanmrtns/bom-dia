const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

class ManageImage {
    //82 char por linha
    //76 char por linha considerando padding
    async execute(phrase){

        try {
            loadImage("./tmp/output.png").then((image) => {
                const palavras = phrase.split(" ")
                const metade = Math.round((palavras/2))

                

                const canvas = createCanvas(image.width, image.height);
                const context = canvas.getContext("2d");
                
                context.fillStyle = "white";
                context.fillRect(0, 0, image.width, image.height);
                context.drawImage(image, 0, 0);
                context.strokeStyle = "rgb(255, 0, 0)";
                context.fillStyle = "rgb(212, 66, 245)";
                // context.font = "70px Arial";
                context.font = "bold 48px Courier";
                context.shadowBlur = 10
                context.textAlign = "center";
                context.textBaseline = "top"
                context.fillText("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 0, 0);
                // context.textBaseline = "bottom"
                // context.fillText(phrase.split(" ").slice(metade, palavras).join(" "), (image.width/2), (image.height*0.9));
    
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