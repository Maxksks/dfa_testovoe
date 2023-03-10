const multer = require('multer')
const moment = require('moment')

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'images/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const filter = (req, file, cb) => {
    if(allowedMimeTypes.includes(file.mimeType)){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
     storage, filter, limits
})