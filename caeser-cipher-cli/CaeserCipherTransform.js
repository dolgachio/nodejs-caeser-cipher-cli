let { Transform } = require('stream');
let { StringDecoder } = require('string_decoder')

class CaeserCipherTransform extends Transform {
    constructor(options, action, shift) {
      super (options)
  
      this._decoder = new StringDecoder('utf-8')
      this._action = action;
      this._shift = shift;
    }
  
    _transform (chunk, encoding, callback) {
      if (encoding === 'buffer') {
        chunk = this._decoder.write(chunk)
      }
  
      let isExit = chunk === '\u0003';
      if (isExit) {
        process.exit()
      }

      if (this._action === 'encode') {
        chunk = caeserShiftFunction(chunk, this._shift);
      } else {
        chunk = caeserShiftFunction(chunk, -this._shift);
      }

      callback(null, chunk)
    }
}

function caeserShiftFunction(str, shift) {
    if (shift < 0) {
      return caeserShiftFunction(str, shift + 26);
    }
  
    let output = "";
  
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
  
      if (letter.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);
  
        if (code >= 65 && code <= 90) {
            letter = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
  
        else if (code >= 97 && code <= 122) {
            letter = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
  
      output += letter;
    }
  
    return output;
};

module.exports = CaeserCipherTransform;