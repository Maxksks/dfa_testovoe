const {Schema, model} = require('mongoose')

const Image = new Schema({
    originalFileName: { type: String, required: true},
    fileName: { type: String, required: true},
    filePath: { type: String, required: true},
    userId: { type: String, required: true}
})

module.exports = model('image', Image)