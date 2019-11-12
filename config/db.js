const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        })
        console.log('mongodb Connected...')
    } catch (err) {
        console.log(err)
        // Exit process with failure
        process.emit(1)
    }
}

module.exports = connectDB
