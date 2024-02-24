import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreateSongs () {

    const [title , setTitle] = useState()
    const [artist , setArtist] = useState()
    const [album , setAlbum] = useState()
    const [gener , setGener] = useState()
    var API_URL = "http://localhost:3001"
    const navigate =useNavigate()

    
    const saveSongsInfo = (e) =>{
        e.preventDefault();
        axios.post(API_URL +"/createSong" , {title,artist,album,gener})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={saveSongsInfo}>
                    <h2>Add Song</h2>
                    <div className="mb-2">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Enter Title" className="form-control" 
                         onChange={(e) =>setTitle(e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Artist</label>
                        <input type="text" placeholder="Enter Artist" className="form-control"
                        onChange={(e) =>setArtist(e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Album</label>
                        <input type="text" placeholder="Enter Album" className="form-control" 
                        onChange={(e) =>setAlbum(e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Genre</label>
                        <input type="text" placeholder="Enter Genre" className="form-control" 
                        onChange={(e) =>setGener(e.target.value)}/>
                    </div>

                    <button className="btn btn-success">Submit</button>
                    <button className="btn btn-light" onClick={'/'}>Cancel</button>
                </form>

            </div>
            
        </div>
    )
}
export default CreateSongs