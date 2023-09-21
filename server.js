require('dotenv').config();
const net = require('net');
const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/fotax_tes_server')
  .then(() => console.log('MongoDB Connected!'));

const frameCtrl = require('./src/controllers/frameController');
const { makeResponseData, CRC32, timestamp, log, processIvnData, processJ1939Data } = require('./src/utils/utils');

let sockets = {};
var filterIMEI = '';

const server = net.createServer((socket) => {
  log('info', 'A new device connected');
  // socket.write('Welcome to the server!\n');

  var isLogin = false;
  var imei = '';

  socket.on('data', async (packetData) => {
    // Broadcast the message to all connected clients
    // server.getConnections((err, count) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(count);
    // });

    (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${packetData}`);

    const sData = packetData.toString();
    const checksum = sData.slice(sData.indexOf('*') + 1, sData.length);
    const frameData = sData.slice(sData.indexOf('$') + 1, sData.indexOf('*'));
    const frame = frameData.split(',');

    let paramCntList = {
        LIN: 11, TP: 48, HMP: 11, IVN: 5, J1939: 5, DOTA: 3
    }
    if (frame[0] === 'LIN') imei = frame[4];
    if (frame[0] === 'IVN') paramCntList[frame[0]] += (parseInt(frame[3]) - 1);
    if (frame[0] === 'J1939') paramCntList[frame[0]] += (parseInt(frame[3]) - 1);

    if (frame.length !== paramCntList[frame[0]]) {
        const responseData = makeResponseData(['#', frame[0], 'N16']);
        socket.write(responseData);
        (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${responseData}`);

        isLogin && frameCtrl.saveNegResponse([imei, frame[0], sData]);
        return;
    }
    else if (checksum !== CRC32(`$${frameData}*`)) {
        const responseData = makeResponseData(['#', frame[0], 'N15']);
        socket.write(responseData);
        (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${responseData}`);

        isLogin && frameCtrl.saveNegResponse([imei, frame[0], sData]);
        return;
    }

    if (frame[0] === 'LIN') {
        // 1. packetHeader, 2. DeviceType, 3. VendorID, 4. VehicleRegID, 5. IMEI
        // 6. Firmware 7. ProtocolVersion 8.Lat 9. Lat Dir 10. Lng 11. Lng Dir
        try {
            const data = {
                device_type: frame[1],
                imei: frame[4],
                veh_reg_no: frame[3],
                vendor: frame[2]
            };
            frameCtrl.savePeriodicFrame(frame[0], true, frame.slice(4));

            const request = await axios.post(`${process.env.AS_SERVER_API}/devices/login/fotax/`, data);
            const response = request.data.message;
            const responseData = makeResponseData(['#', frame[0], response]);
            socket.write(responseData);
            console.log(`${timestamp()} - ${responseData}`);
            log('success', `Device [${imei}] logged in`);
            isLogin = true;
            sockets[imei] = socket;

            frameCtrl.savePeriodicFrame(frame[0], false, [imei, response]);
        } catch(err) {
            const { data } = err.response;
            const responseData = makeResponseData(['#', frame[0], data.error]);
            socket.write(responseData);
            console.error(`${timestamp()} - ${responseData}`);

            frameCtrl.saveNegResponse([imei, frame[0], sData]);
        }
    }
    else {
        if (!isLogin) return;

        if (frame[0] === 'DOTA') {
            // console.log('DOTA', frame);
            // const response = 'OK';
            // const responseData = makeResponseData(['$', frame[0], response, frame[2]]);
            // console.log(socket.write(responseData));
            // (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${responseData}`);
        }
        else {
            let data = frame.slice(1);
            if (frame[0] === 'IVN') {
              let cidData = data.slice(3);
              cidData.forEach( item => {
                data = processIvnData(item);
                frameCtrl.savePeriodicFrame(frame[0], true, [imei, ...data]);
              })
            }
            else if (frame[0] === 'J1939') {
              let spnData = data.slice(3);
              spnData.forEach( item => {
                data = processJ1939Data(item);
                frameCtrl.savePeriodicFrame(frame[0], true, [imei, data]);
              });
            }
            const response = 'OK';
            const responseData = makeResponseData(['#', frame[0], response]);
            socket.write(responseData);
            (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${responseData}`);

            frameCtrl.savePeriodicFrame(frame[0], false, [imei, response]);
        }
    }
  });

  socket.on('end', () => {
    log('info', `Device [${imei}] disconnected`);
    delete sockets[imei];
  });
  socket.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      log('info', `Device [${imei}] disconnected abruptly`);
      delete sockets[imei];
    } else {
      log('error', 'Socket error:', err);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`TCP server listening on port ${process.env.PORT}...`);
});


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please type IMEI for device to filter: ', (imei) => {
  filterIMEI = imei;
  rl.close();
});


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.post('/api/commands/diagnostics', (req, res) => {
  const { imei, commands } = req.body;
  const socket = sockets[imei];
  
  if (socket) {
    const responseData = makeResponseData(['#', 'DOTA', 'CMD', commands]);
    socket.write(responseData);
    (filterIMEI === '' || filterIMEI === imei) && console.log(`${timestamp()} - ${responseData}`);

    frameCtrl.saveDotaFrame([imei, 'Tx', commands]);

    socket.on('data', (data) => {
      const sData = data.toString();
      // const checksum = sData.slice(sData.indexOf('*') + 1, sData.length);
      const frameData = sData.slice(sData.indexOf('$') + 1, sData.indexOf('*'));
      const frame = frameData.split(',');

      if (!res.headersSent) {
        frameCtrl.saveDotaFrame([imei, 'Rx', commands]);
        res.json({
          success: true,
          commands: frame[2]
        });
      }
    });
    
    socket.on('error', (err) => {
      // console.error(err);
      if (!res.headersSent)
      res.status(500).json({
        success: false,
        error: err.message
      });
    });

    setTimeout(() => {
      if (!res.headersSent)
      res.status(500).json({
        success: false,
        error: 'Timeout waiting for response'
      });
    }, 5000);

  } else {
    res.status(400).json({
      success: false,
      error: 'IMEI error'
    });
  }
});


app.listen(process.env.CC_PORT, () =>
  console.log(`Express server listening on port ${process.env.CC_PORT}...`),
);