const fs = require('fs');
const client = require('https');
const pexels = require("../lib/pexels")

class RequestImage {
  async execute(imageTheme) {
    const photos = await pexels.photos.search({
      query: imageTheme,
      per_page: 100
    })

    const randomImageIndex = Math.floor(Math.random() * 100)

    const photo = await pexels.photos.show({ id: photos.photos[randomImageIndex].id })

    try {
      await this.downloadImage(photo.src.landscape, 'tmp/output.png')
    } catch (e) {
      console.log(e)
    }
  }

  async downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
      client.get(url, (res) => {
        if (res.statusCode === 200) {
          res.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath))
        } else {
          res.resume();
          reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`))
        }
      })
    })
  }
}

module.exports = RequestImage