const fs = require('fs')
const ytdl = require('ytdl-core')
const ffmpegPath = require('ffmpeg-static')
const {execSync} = require('child_process')
const {EOL} = require('os')


async function main() {
    const quality = 'lowest'
    const links = fs.readFileSync('ytlist.txt').toString().split(EOL)

    for (const link of links) {

        try {
            console.log('Downloading audio for video...')
            await new Promise((resolve, reject) => {
                ytdl(link, {quality, filter: 'audioonly'})
                .on('progress', (_, downloaded, total) => {
                    const progress = Math.trunc((downloaded / total) * 100)
                    if (progress % 10 === 0) {
                        console.log(`${progress} % completed`)
                    }
                })
                .on('end', () => {
                    resolve()
                })
                .on('error', () => reject())
                .pipe(fs.createWriteStream('video.mp3'))
            })
        } catch {
            console.log('Failed to download audio for video')
            return
        } 
        
        try {
            console.log('Downloading video...')
            await new Promise((resolve, reject) => {
                ytdl(link, {quality, filter: 'videoonly'})
                .on('progress', (_, downloaded, total) => {
                    const progress = Math.trunc((downloaded / total) * 100)
                    if (progress % 10 === 0) {
                        console.log(`${progress} % completed`) 
                    }
                })
                .on('end', () => {
                    resolve()
                })
                .on('error', () => reject())
                .pipe(fs.createWriteStream('video.mp4'))
            }) 
        } catch {
            console.log('Failed to download video')
            return
        }

        console.log('Merging audio and video')
        let title
        try {
            title = (await ytdl.getInfo(link)).videoDetails.title 
        } catch {
            console.log('Failed to get video title')
            return
        }

        const ffmpegProcess = execSync(
            `${ffmpegPath} -i video.mp4 -i video.mp3 -c:v copy -c:a aac ${title}.mp4`
        )
        
        ffmpegProcess.stdout.on('end', () => {
            fs.unlink('video.mp3', (err) => {
                if (err) throw err
            })
            fs.unlink('video.mp4', (err) => {
                if (err) throw err
            })
            console.log('Merged complete!')
        })

    }
}

main()
