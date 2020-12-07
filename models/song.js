const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: Array,
        require: true
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
        require: true
    }
})

module.exports = mongoose.model("song", songSchema)