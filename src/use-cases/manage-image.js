class ManageImage {
    
    execute(){
        // const Jimp = require('jimp');

        // Jimp.read("./temp/imagem.jpg")
        // .then((image) => {
        //     // Do stuff with the image.
        //     image.resize(500, 500) // resize
        //     // Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
        //     //     image.print(font, 175, 25, "Boa noite");
        //     //     image.print(font, 175, 450, "Boa semana");
        //     //     image.write('./temp/textOverlay.jpg');
        //     // });
        //     image.write('./temp/imagem.png');
        // })
        // .catch((err) => {
        //     // Handle an exception.
        //     console.log(err);
        // });

        const fs = require("fs");
        const { createCanvas, loadImage } = require("canvas");
        // const canvas = createCanvas(500, 500);

        // const context = canvas.getContext("2d");
        // context.fillStyle = "white";
        // context.fillRect(0, 0, 500, 500);

        // context.fillStyle = "#000";
        // context.font = "72px Arial";
        // context.textAlign = "center";
        // context.fillText("Hello, World!", 250, 250);

        loadImage("").then((image) => {
            const canvas = createCanvas(image.width, image.height);

            const context = canvas.getContext("2d");
            context.fillStyle = "white";
            context.fillRect(0, 0, image.width, image.height);

            context.drawImage(image, 0, 0);

            // context.fillStyle = "#000";
            // context.strokeStyle = "#4287f5"
            context.fillStyle = "rgb(0, 0, 0)";
            context.strokeStyle = "rgb(255, 0, 0)";
            context.font = "64px Arial";
            context.textAlign = "center";
            context.textBaseline = "top"
            context.fillText("Bom dia", (image.width/2), (image.height/6));
            context.textBaseline = "bottom"
            context.fillText("Boa semana", (image.width/2), (image.height*0.9));

            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync("./temp/saida.png", buffer);

            console.log("Imagem criada");
        });

    }

}

module.exports = ManageImage