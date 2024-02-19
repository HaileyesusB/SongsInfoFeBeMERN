const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const SongsModel = require('./models/songsInfo')
const ObjectId = mongoose.Types.ObjectId;

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/SongsInfoMERNApp")

app.post('/createSong', (req , res) =>{
    console.log(req.body)
    SongsModel.create(req.body)
    .then(song => res.json(song))
    .catch(err => res.json(err))
})

app.get('/getSongsById/:id', (req, res) => {
    const id = req.params.id;
    SongsModel.findById({_id:id})
    .then(song =>res.json(song))
    .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    SongsModel.find({})
    .then(song =>res.json(song))
    .catch(err => res.json(err))
})

app.put('/updateSongs/:id', (req, res) => {
    const id = req.params.id;
    SongsModel.findByIdAndUpdate({_id:id}, {
        title: req.body.title, 
        artist: req.body.artist,
        album: req.body.album,
        gener: req.body.gener})
    .then(song =>res.json(song))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is running")
}) 
