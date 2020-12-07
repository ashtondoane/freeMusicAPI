const express = require('express')
const router = express.Router()
const Song = require('../models/song')

//Get all songs from the db
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find()
        res.json(songs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get song by json category
router.get('/:category/:data', async (req, res) =>{
    try{
        const queryObject = {};
        const data = req.params.data
        queryObject[req.params.category] = data
        const songs = await Song.find(queryObject)
        res.json(songs)
    } catch (error){
        res.status(500).json({message:error.message})
    }
})

//Add a new song -- must add auth somehow, only I should be able to add from a different script when I scrape
router.post('/', async (req, res) => {
    const song = new Song({
        title: req.body.title,
        genre: req.body.genre,
        tempo: req.body.tempo,
        length: req.body.length,
        artist: req.body.artist,
        credits: req.body.credits,
        link: req.body.link
    })
    try {
        const newSong = await song.save()
        res.status(201).json(newSong)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete by category/data. Should typically be accessed by ID to make sure only one is deleted
router.delete('/:category/:data', async (req, res) =>{
    try{
        const queryObject = {};
        const data = req.params.data
        queryObject[req.params.category] = data
        const songs = await Song.remove(queryObject)
        res.json({message: "Deleted song"})
    } catch (error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router