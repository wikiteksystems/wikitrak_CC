const {
    LinReqModel, LinResModel,
    HmtReqModel, HmtResModel,
    TrkReqModel, TrkResModel,
    IvnReqModel, IvnResModel,
    J1939ReqModel, J1939ResModel,
    NegRespModel,
    DotaModel
  } = require('../models');

exports.savePeriodicFrame = (type, isRequest, data) => {
    let frame = null;
    if (type === 'LIN')
        frame = isRequest ? new LinReqModel() : new LinResModel();
    else if (type === 'HMP')
        frame = isRequest ? new HmtReqModel() : new HmtResModel();
    else if (type === 'TP')
        frame = isRequest ? new TrkReqModel() : new TrkResModel();
    else if (type === 'IVN')
        frame = isRequest ? new IvnReqModel() : new IvnResModel();
    else if (type === 'J1939')
        frame = isRequest ? new J1939ReqModel() : new J1939ResModel();

    frame !== null && frame.save(data);
}

exports.saveNegResponse = (data) => {
    const frame = new NegRespModel();
    frame.save(data);
}

exports.saveDotaFrame = (data) => {
    const frame = new DotaModel();
    frame.save(data);
}