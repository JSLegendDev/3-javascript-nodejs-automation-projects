const fs = require('fs')
const sharp = require('sharp')

const imageDirName = 'images'
const outputDirName = 'images-output'
fs.readdir(imageDirName, (err, files) => {
    if (err) {
        console.log(err)
        return
    }

    for (const file of files) {
        sharp(`${imageDirName}/${file}`)
        .jpeg({
            quality: 100,
            chromaSubsampling: '4:4:4',
            quantisationTable: 0
        })
        .resize({width: 100, kernel: 'nearest'})
        .sharpen()
        .modulate({lightness: 10})
        .toFile(`${outputDirName}/${file.split('.')[0]}.jpeg`)
    }
})