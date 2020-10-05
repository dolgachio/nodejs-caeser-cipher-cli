let fs = require('fs');
let path = require('path');

function getStreams(input, output) {
    let inputStream;
    if (input) {
        let inputFilePath = path.normalize(path.join(__dirname, '../', input));
        inputStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' });

        inputStream.on('error', () => {
            console.error('Cannot open file: ', input);
            process.exit(1);
        });
    } else {
        inputStream = process.stdin;
    }

    let outputStream;
    if (output) {
        let outputFilePath = path.normalize(path.join(__dirname, '../', output));

        outputStream = fs.createWriteStream(outputFilePath, {encoding: 'utf-8', flags: 'a'});

        inputStream.on('error', () => {
            console.error('Cannot write file: ', input);
            process.exit(1);
        });
    } else {
        outputStream = process.stdout;
    }

    return { inputStream, outputStream };
}

module.exports = { getStreams };