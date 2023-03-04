const {Schema, model} = require('mongoose')

const User = new Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    //images: [{type: String, ref: 'Image'}]
})

module.exports = model('user', User)