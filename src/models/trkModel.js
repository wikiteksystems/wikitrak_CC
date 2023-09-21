const { BaseFrameModel } = require('../base/baseFrameModel');

class TrkReqModel extends BaseFrameModel {
    constructor() {
        super('trk_reqs', {
            imei: String,
            packetType: String,
            messageId: Number,
            packetStatus: String,
            gpsFix: Boolean,
            date: Date,
            Time: Date,
            Lat: Number,
            LatDir: String,
            Lng: Number,
            LngDir: String,
            speed: Number,
            heading: Number,
            satellitesNum: Number,
            altitude: Number,
            pdop: Number,
            hdop: Number,
            networkOperator: String,
            ignitionStatus: Boolean,
            mainPowerStatus: Boolean,
            mainInputVoltage: Number,
            internalBatteryVoltage: Number,
            emergency: Boolean,
            tamperAlert: String,
            gsmSignalStrength: Number,
            mcc: Number,
            mnc: Number,
            lac: String,
            cellId: String,
            gsmSignalStrength1: Number,
            lac1: String,
            cellId1: String,
            gsmSignalStrength2: Number,
            lac2: String,
            cellId2: String,
            gsmSignalStrength3: Number,
            lac3: String,
            cellId3: String,
            gsmSignalStrength4: Number,
            lac4: String,
            cellId4: String,
            digitalInputStatus: Number,
            digitalOutputStatus: Number,
            frameNumber: Number,
            analogInput1: Number,
            analogInput2: Number,
            deltaDistance: Number,
            otaResponse: String,
            timestamp: Date
        });
    }
}

class TrkResModel extends BaseFrameModel {
    constructor() {
        super('trk_res', {
            imei: String,
            status: String,
            timestamp: Date
        });
    }
}

exports.TrkReqModel = TrkReqModel;
exports.TrkResModel = TrkResModel;