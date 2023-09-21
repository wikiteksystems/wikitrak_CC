const { BaseFrameModel } = require('../base/baseFrameModel');

class NegRespModel extends BaseFrameModel {
    constructor() {
        super('neg_res', {
            imei: String,
            packetHeader: String,
            requestFrame: String,
            timestamp: Date
        });
    }
}

exports.NegRespModel = NegRespModel;