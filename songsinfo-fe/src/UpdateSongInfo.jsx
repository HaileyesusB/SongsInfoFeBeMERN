import React, {useState,useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom"
import axios from 'axios'

function UpdateSong () {

    const {id} = useParams()
    const [title , setTitle] = useState()
    const [artist , setArtist] = useState()
    const [album , setAlbum] = useState()
    const [gener , setGener] = useState()
    var API_URL = "http://localhost:3001"
    const navigate =useNavigate()

    useEffect(() => {
        axios.get(API_URL+"/getSongsById/"+id)
        .then(res =>{
            console.log(res)
            setTitle(res.data.title)
            setArtist(res.data.artist)
            setAlbum(res.data.album)
            setGener(res.data.gener)
        })
        .catch(err => console.log(err))
    } ,[])

    const update = (e) => {
        e.preventDefault();
        axios.put(API_URL +"/updateSongs/"+id , {title,artist,album,gener})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={update}>
                <h2>Update Song</h2>
                <div className="mb-2">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter Title" className="form-control" 
                    value={title} onChange={(e) =>setTitle(e.target.value)}/>
                </div>

                <div className="mb-2">
                    <label htmlFor="">Artist</label>
                    <input type="text" placeholder="Enter Artist" className="form-control" 
                     value={artist} onChange={(e) =>setArtist(e.target.value)}/>
                </div>

                <div className="mb-2">
                    <label htmlFor="">Album</label>
                    <input type="text" placeholder="Enter Album" className="form-control" 
                    value={album} onChange={(e) =>setAlbum(e.target.value)}/>
                </div>

                <div className="mb-2">
                    <label htmlFor="">Genre</label>
                    <input type="text" placeholder="Enter Genre" className="form-control" 
                    value={gener} onChange={(e) =>setGener(e.target.value)}/>
                </div>

                <button className="btn btn-success">Update</button>
                <button className="btn btn-light" onClick={'/'}>Cancel</button>
            </form>

        </div>
        
    </div>
    )
}

export default UpdateSong;