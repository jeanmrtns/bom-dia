const pexels = require("../lib/pexels")

class RequestImage {
  async execute(imageTheme) {
    const photos = await pexels.photos.search({ 
      query: imageTheme,
      per_page: 1
    })

    return photos.photos[0].url
  }
}

module.exports = RequestImage