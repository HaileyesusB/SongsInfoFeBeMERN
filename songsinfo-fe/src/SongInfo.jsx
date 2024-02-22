import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"


function Songs () {
    const [songs, setSongs] = useState([])
    const [songsByAlbum, setSongsByAlbum] = useState([]);
    const [songsByTitle, setSongsByTitle] = useState([]);
    const [songsByArtist, setSongsByArtist] = useState([]);
    const [songsByGenere, setSongsByGenere] = useState([]);


    var API_URL = "http://localhost:3001"
    useEffect(() => {
      //const songsByAlbumResponse =  fetch(API_URL+'/songsByAlbum');
      axios.get(API_URL+'/songsByAlbum')
      .then(result=> {
      setSongsByAlbum(result.data)})
      .catch(err => console.log(err))

      axios.get(API_URL+'/songsByTitle')
      .then(result=> {
       setSongsByTitle(result.data)
    })
      .catch(err => console.log(err))

      axios.get(API_URL+'/songsByArtist')
      .then(result=> {
       setSongsByArtist(result.data)})
      .catch(err => console.log(err))

      axios.get(API_URL+'/songsByGenere')
      .then(result=> {
       setSongsByGenere(result.data)})
      .catch(err => console.log(err))
 
      axios.get(API_URL)
      .then(result => setSongs(result.data))
      .catch(err => console.log(err))

    }, [])

  const handelDelete  = (id) =>
  {
    axios.delete(API_URL+'/deleteSong/'+id)
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => console.log(err))
  }
    return (
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-350 bg-white rounded p-5">
                <Link to="/create" className="btn btn-success" style={{width: "150px" , marginRight: "850px"}}>Add +</Link>
               <table className="table">
                <thead>
                    <tr>
                        <th>Total # of Songs ({songsByTitle}) </th>
                        <th>Total # of Artists ({songsByArtist})</th>
                        <th>Total # of Album ({songsByAlbum})</th>  
                        <th>Total # of Gener({songsByGenere})</th>
                        <th>Action </th>
                    </tr>
                </thead>
                <tbody>
                   {
                    songs.map((song) => {
                       return <tr>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>{song.album}</td>
                            <td>{song.gener}</td>
                            <td><Link to={`/update/${song._id}`} className="btn btn-outline-primary p-2 ml-2">Update</Link> 
                            </td>
                            <td>
                           <button className="btn btn-outline-danger p-2 ml-5"
                           onClick={(e) => handelDelete(song._id)}>Delete</button></td>
                        
                        </tr>
                    })
                   }
                </tbody>

               </table>
            </div>
            
        </div>
    )
}

export default Songs