const { BaseFrameModel } = require('../base/baseFrameModel');

class HmtReqModel extends BaseFrameModel {
    constructor() {
        super('hmt_reqs', {
            imei: String,
            packetStatus: String,
            battery: Number,
            lowBattery: Number,
            memoryPercent1: Number,
            memoryPercent2: Number,
            dataUpdateRateOn: Number,
            dataUpdateRateOff: Number,
            digitalInputStatus: Number,
            analogInput1: Number,
            analogInput2: Number,
            timestamp: Date
        });
    }
}

class HmtResModel extends BaseFrameModel {
    constructor() {
        super('hmt_res', {
            imei: String,
            status: String,
            timestamp: Date
        });
    }
}

exports.HmtReqModel = HmtReqModel;
exports.HmtResModel = HmtResModel;