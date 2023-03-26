class ManageImage {
    
    async execute(){
        const fs = require("fs");
        const { createCanvas, loadImage } = require("canvas");

        try {
            loadImage("./tmp/output.png").then((image) => {
                const canvas = createCanvas(image.width, image.height);
                const context = canvas.getContext("2d");
                
                context.fillStyle = "white";
                context.fillRect(0, 0, image.width, image.height);
                context.drawImage(image, 0, 0);
                context.strokeStyle = "rgb(255, 0, 0)";
                context.fillStyle = "rgba(212, 66, 245, 0.8)";
                // context.font = "70px Arial";
                context.font = "italic bold 70px Courier";
                context.textAlign = "center";
                context.textBaseline = "top"
                context.fillText("Bom dia", (image.width/2), (image.height/6));
                context.textBaseline = "bottom"
                context.fillText("Boa semana", (image.width/2), (image.height*0.9));
    
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