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


app.delete('/deleteSong/:id', (req, res) => {
    const id = req.params.id;
    SongsModel.findByIdAndDelete({_id:id})
    .then(song =>res.json(song))
    .catch(err => res.json(err))
})

  // Get songs by album
  app.get('/songsByAlbum', async (req, res) => {
    const albums = await SongsModel.find().populate('album'); 
    const songsByAlbum = albums.map((album) => ({
     songCount: album.album.length
    }));
    res.json(songsByAlbum.length);
   
  });

    // Get songs by album
    app.get('/songsByTitle', async (req, res) => {
        const titles = await SongsModel.find().populate('title'); 
        const songsByTitle = titles.map((title) => ({
         songCount: title.title.length
        }));
        res.json(songsByTitle.length);
       
      });

    // Get songs by album
    app.get('/songsByArtist', async (req, res) => {
        const artists = await SongsModel.find().populate('artist'); 
        const songsByArtist = artists.map((artist) => ({
         songCount: artist.artist.length
        }));
        res.json(songsByArtist.length);
       
      });

      app.get('/songsByGenere', async (req, res) => {
        const gener = await SongsModel.find().populate('gener');
        
        const songsByGenere = gener.map((genere) => ({
         songCount: genere.gener
        }));
        console.log("ABCD" , songsByGenere)
        res.json(songsByGenere.length);
       
      });

app.listen(3001, () => {
    console.log("Server is running")
}) 
