let { promisify } = require('util');
let  { pipeline } = require('stream');
let pipelineAsync = promisify(pipeline);

let { getArguments } = require('./getArguments');
let { getStreams } = require('./getStreams');
let CaeserCipherTransform = require('./CaeserCipherTransform');

let { shift, input, output, action } = getArguments();

process.on('exit', (code) => {
    console.log(`About to exit with code ${code}`);
})

if (!shift) {
    let error = 'The required "shift" parameter is missing';
    console.error(error);
    process.exit(1);
}

if (!action) {
    let error = 'The required "action" parameter is missing';
    console.error(error);
    process.exit(1);
}

let { inputStream, outputStream } = getStreams(input, output);

let transformProcess = pipelineAsync(
    inputStream,
    new CaeserCipherTransform({}, action, shift),
    outputStream,
);

transformProcess
    .then(() => console.log('Transform finished successfully!'))
    .catch((error) => console.error('Error occured when transform', error));
