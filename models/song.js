const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        require: false
    },
    genre: {
        type: Array,
        require: false
    },
    tempo: {
        type: Number,
        require: false
    },
    length: {
        type: Number,
        require: false
    },
    artist: {
        type: String,
        require: false
    },
    credits: {
        type: String,
        require: false
    },
    link: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model("song", songSchema)