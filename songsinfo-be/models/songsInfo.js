const mongoose = require('mongoose')

const songsInfo = new mongoose.Schema({
    title: String,
    artist: String,
    album : String,
    gener : String,
})

const songInfoModel = mongoose.model("songsInfo", songsInfo)
module.exports = songInfoModel