const mongoose = require('mongoose');
const { timestamp } = require('../utils/utils');

class BaseFrameModel {
    constructor(collectionName, schemaDefinition) {
        this.collectionName = collectionName;
        this.schema = new mongoose.Schema(schemaDefinition);
        if (mongoose.models[collectionName]) {
            this.model = mongoose.model(collectionName);
        } else {
            this.model = mongoose.model(collectionName, this.schema);
        }
    }

    save(data) {
        try {
            const keys = Object.keys(this.schema.obj);
            let processData = {};
            keys.forEach( (key, index) => {
                processData[key] = data[index];
            });
            processData.timestamp = timestamp();

            const modelInstance = new this.model(processData);
            modelInstance.save();
        } catch(e) {
            console.log('Save Exception', e);
        }
    }
}

exports.BaseFrameModel = BaseFrameModel;