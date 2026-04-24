const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL:{
        type:String,
        required:true
    },
    shortenedURL:String,
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})
const urlModel = mongoose.model('url', urlSchema);

module.exports = urlModel