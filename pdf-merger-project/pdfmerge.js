const fs = require('fs')
const PDFMerger = require('pdf-merger-js');

async function main() {
    const files = fs.readdirSync('pdfs-to-merge')
    const merger = new PDFMerger()

    for (const file of files) {
        await merger.add(`pdfs-to-merge/${file}`)
    }

    await merger.save('js-cheatsheet.pdf')
}

main()