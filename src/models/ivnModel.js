const { BaseFrameModel } = require('../base/baseFrameModel');

class IvnReqModel extends BaseFrameModel {
    constructor() {
        super('ivn_reqs', {
            imei: String,
            frameId: Number,
            value: Array,
            timestamp: Date
        });
    }
}

class IvnResModel extends BaseFrameModel {
    constructor() {
        super('ivn_res', {
            imei: String,
            status: String,
            timestamp: Date
        });
    }
}

exports.IvnReqModel = IvnReqModel;
exports.IvnResModel = IvnResModel;