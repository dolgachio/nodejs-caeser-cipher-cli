let argv = require('minimist')(process.argv.slice(2));

function getArguments() {
    let shift = argv['shift'] || argv['s'] || null;
    let input = argv['input'] || argv['i'] || null;
    let output = argv['output'] || argv['o'] || null;
    let action = argv['action'] || argv['a'] || null;

    return {
        shift,
        input,
        output,
        action,
    };
}

module.exports = { getArguments };