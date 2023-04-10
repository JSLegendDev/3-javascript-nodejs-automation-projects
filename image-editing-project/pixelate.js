const fs = require('fs')
const sharp = require('sharp')

const imageDirName = 'images'
const outputDirName = 'images-output'

function main() {

    let images
    try {
        images = fs.readdirSync(imageDirName)
    } catch {
        console.log('Unable to open image directory.')
        return
    }

    for (const image of images) {
        sharp(`${imageDirName}/${image}`)
        .jpeg({
            quality: 100,
            chromaSubsampling: '4:4:4',
            quantisationTable: 0
        })
        .resize({width: 100, kernel: 'nearest'})
        .sharpen()
        .modulate({lightness: 10})
        .toFile(`${outputDirName}/${image.split('.')[0]}.jpeg`)
    }
}

main()