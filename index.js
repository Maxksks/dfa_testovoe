const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const galleryRouter = require('./routes/galleryRoute')
const config = require('./config')
const PORT = config.serverPort || 4000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/gallery', galleryRouter)

const start = async () => {
    try {
        await mongoose.connect(config.dbUrl)
        app.listen(PORT, ()=>{console.log(`server started${PORT}`)})
    } catch (e) {
        console.log(e)
    }
}

start()