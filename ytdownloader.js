const fs = require('fs')
const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg-static')

const link = 'https://www.youtube.com/watch?v=C7FUVtnRR38'

async function main() {
    await new Promise((resolve, reject) => {
        ytdl(link, {quality: 'lowestaudio'})
        .on('progress', (_, downloaded, total) => {
            console.log(`${(downloaded / total) * 100}% completed`)
        })
        .on('end', () => {
            resolve()
        })
        .pipe(fs.createWriteStream('video.mp3'))
    })
    
    ytdl(link, {quality: 'lowestvideo'})
    .on('progress', (_, downloaded, total) => {
        console.log(`${(downloaded / total) * 100}% completed`)
    })
    .pipe(fs.createWriteStream('video.mp4'))
}

main()