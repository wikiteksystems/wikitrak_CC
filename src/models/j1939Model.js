const { BaseFrameModel } = require('../base/baseFrameModel');

class J1939ReqModel extends BaseFrameModel {
    constructor() {
        super('j1939_reqs', {
            imei: String,
            // spnId: String,
            value: Array,
            timestamp: Date
        });
    }
}

class J1939ResModel extends BaseFrameModel {
    constructor() {
        super('j1939_res', {
            imei: String,
            status: String,
            timestamp: Date
        });
    }
}

exports.J1939ReqModel = J1939ReqModel;
exports.J1939ResModel = J1939ResModel;