const Image = require('../models/Image')
const config = require('../config')
const fs = require('fs')

class GalleryController {
    async uploadImage(req, res){
        try{
            const userId = req.user.id
            const file = req.file

            const image = new Image({
                originalFileName: file.originalname,
                fileName: file.filename,
                filePath: file.path,
                userId: userId
            })
            await image.save()

            return res.status(201).json(image)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cant upload image'})
        }

    }

    async getAllImages(req, res){
        try{
            const userId = req.user.id
            const images = await Image.find({userId: userId})

            return res.status(201).json(images)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Bad request'})
        }

    }

    async getImage(req, res){
        try{
            const imageId = req.params.id
            const image = await Image.findOne({_id: imageId})
            const path = config.filePath + image.filePath
            if (fs.existsSync(path)) {
                return res.download(path, image.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }

    async updateImage(req, res){
        try{
            const imageId = req.params.id
            const file = req.file

            const existingImage = await Image.findOne({_id: imageId})
            if(!existingImage){
                return this.uploadImage(req, res)
            }

            existingImage.originalFileName = file.originalname
            existingImage.fileName = file.filename
            existingImage.filePath = file.path
            await existingImage.save()

            return res.status(201).json(existingImage)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cant upload image'})
        }
    }

    async deleteImage(req, res){
        try{
            const imageId = req.params.id
            const image = await Image.findOneAndRemove({_id: imageId})
            return res.status(201).json(image)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message:'Failed'})
        }
    }

    async deleteAll(req, res){
        try{
            const images = await Image.find()
            for (const image of images) {
                await Image.findOneAndRemove({_id: image._id})
            }
            return res.status(201).json(images)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message:'Failed'})
        }
    }
}

module.exports = new GalleryController()