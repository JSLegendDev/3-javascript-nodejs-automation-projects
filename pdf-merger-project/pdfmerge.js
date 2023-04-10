const fs = require('fs')
const PDFMerger = require('pdf-merger-js');

const pdfDirName = 'pdfs-to-merge'
async function main() {
    const files = fs.readdirSync(pdfDirName)
    const merger = new PDFMerger()

    for (const file of files) {
        await merger.add(`${pdfDirName}/${file}`)
    }

    await merger.save('js-cheatsheet.pdf')
}

main()