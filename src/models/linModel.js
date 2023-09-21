const { BaseFrameModel } = require('../base/baseFrameModel');

class LinReqModel extends BaseFrameModel {
    constructor() {
        super('lin_reqs', {
            imei: String,
            firmware: String,
            protocol: String,
            lat: Number,
            latDir: String,
            lng: Number,
            lngDir: String,
            timestamp: Date
        });
    }
}

class LinResModel extends BaseFrameModel {
    constructor() {
        super('lin_res', {
            imei: String,
            status: String,
            timestamp: Date
        });
    }
}

exports.LinReqModel = LinReqModel;
exports.LinResModel = LinResModel;