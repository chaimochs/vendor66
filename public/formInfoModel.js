const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FormInfo = new Schema({
        name: String,
        description: String,
        site: String,
        affiliate: String,
        longDescription: String,
        category: [{value: String}],
        integration: [{value: String}],
        logo: String,
        screenshots: [{shot: String}],
        payment: [{value: String}]
});

module.exports = mongoose.model('FormInfo', FormInfo);