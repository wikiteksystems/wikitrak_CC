require('dotenv').config();
const net = require('net');
const { makeResponseData } = require('./src/utils/utils');
var client = new net.Socket();
client.connect(process.env.PORT, '127.0.0.1', () => {//use same port of server  
  console.log('Connected to server!');
//   client.write('world!\r\n');
    client.write('$LIN,ftxkol001,Autopeepal,MH15GR1111,862493050335194,0.2,AIS140,48.37365633,N,35.3636373,E*96BE932F');
});  
client.on('data', (data) => {
    console.log(data.toString());
    const sData = data.toString();
    const checksum = sData.slice(sData.indexOf('*') + 1, sData.length);
    const frameData = sData.slice(sData.indexOf('#') + 1, sData.indexOf('*'));
    const frame = frameData.split(',');

    // console.log('DOTA', frame);
    if (frame[0] === 'DOTA') {
        const response = 'OK';
        const responseData = makeResponseData(['$', frame[0], response, frame[2]]);
        client.write(responseData);
    }
});  
client.on('end', () => {
  console.log('disconnected from server');  
});