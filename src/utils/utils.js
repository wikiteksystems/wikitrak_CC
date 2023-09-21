exports.makeResponseData = (data) => {
    let responseData = `${data[0]}${data.slice(1).join(',')}*`;
    const checksum = this.CRC32(responseData);

    responseData += `${checksum}`;
    return responseData;
}

exports.CRC32 = (input) => {
    const crcTable = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let crc = i;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 1) ? (crc >>> 1) ^ 0xEDB88320 : (crc >>> 1);
      }
      crcTable[i] = crc;
    }
  
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < input.length; i++) {
      const byte = input.charCodeAt(i) & 0xFF;
      crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xFF];
    }
    crc ^= 0xFFFFFFFF;
  
    return (crc >>> 0).toString(16).toUpperCase();
}

exports.processIvnData = (data) => {
    const list = data.split(':');
    let hex = parseInt(list[0].toString(16).padStart(8, '0'), 16);
    
    let digits = list[1].padStart(16, '0').match(/.{1,2}/g);
    let valList = digits.map(d => parseInt(d, 16));
    const item = [hex, valList];

    console.log('item', item);
    return item;
}
exports.processJ1939Data = (data) => {
    let digits = data.padStart(16, '0').match(/.{1,2}/g);
    let valList = digits.map(d => parseInt(d, 16));

    return valList;
}

exports.timestamp = () => {
    const moment = require('moment');
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

exports.log = (type, text) => {
    const chalk = require('chalk');
    let prefix = '';
    if (type === 'info')
        prefix = chalk.bgBlue.white('INFO');
    else if (type === 'success')
        prefix = chalk.bgGreen('SUCCESS');
    else if (type === 'error')
        prefix = chalk.bgRed('ERR');
    console.log(prefix, text);
}