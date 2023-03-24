class ManageImage {
    
    execute(){
        const Jimp = require('jimp');

        Jimp.read("./temp/imagem.jpg")
        .then((image) => {
            // Do stuff with the image.
            image.resize(500, 500) // resize
            Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
                image.print(font, 175, 25, "Boa noite");
                image.print(font, 175, 450, "Boa semana");
                image.write('./temp/textOverlay.jpg');
            });
        })
        .catch((err) => {
            // Handle an exception.
            console.log(err);
        });
    }

}

module.exports = ManageImage