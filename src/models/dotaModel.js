const { BaseFrameModel } = require('../base/baseFrameModel');

class DotaModel extends BaseFrameModel {
    constructor() {
        super('dota', {
            imei: String,
            cmdType: String,
            cmd: String,
            timestamp: Date
        });
    }
}


exports.DotaModel = DotaModel;
