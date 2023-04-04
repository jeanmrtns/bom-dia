import fs from 'fs'
import client from 'https'
import { pexels } from '../lib/pexels';
import { Photo, PhotosWithTotalResults } from 'pexels';

export class RequestImage {
  async execute(imageTheme: string) {    
    const photos = await pexels.photos.search({
      query: imageTheme,
      per_page: 100
    }) as PhotosWithTotalResults

    const randomImageIndex = Math.floor(Math.random() * 100) % photos.photos.length

    const photo = await pexels.photos.show({ id: photos.photos[randomImageIndex].id }) as Photo

    try {
      await this.downloadImage(photo.src.landscape, 'tmp/output.png')
    } catch (e) {
      console.log(e)
    }
  }

  async downloadImage(url: string, filepath: string) {
    return new Promise((resolve, reject) => {
      client.get(url, (res: any) => {
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
