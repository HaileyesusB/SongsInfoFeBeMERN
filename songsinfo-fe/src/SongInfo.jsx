import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteHandle, getAllSongs } from "./core/_request";

var API_URL = "http://localhost:3001"

function Songs() {
  const [songs, setSongs] = useState([])
  const [songsByAlbum, setSongsByAlbum] = useState([]);
  const [songsByTitle, setSongsByTitle] = useState([]);
  const [songsByArtist, setSongsByArtist] = useState([]);
  const [songsByGenere, setSongsByGenere] = useState([]);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const { data: res, isLoading, error } = useQuery('songs', () => getAllSongs())

  const queryClient = useQueryClient()

  const data = useMemo(() => res || [], [res]);

  if (!isLoading) {
    console.log(res)
  }

  useEffect(() => {
    axios.get(API_URL + '/songsByAlbum')
      .then(result => {
        setSongsByAlbum(result.data)
      })
      .catch(err => console.log(err))

    axios.get(API_URL + '/songsByTitle')
      .then(result => {
        setSongsByTitle(result.data)
      })
      .catch(err => console.log(err))

    axios.get(API_URL + '/songsByArtist')
      .then(result => {
        setSongsByArtist(result.data)
      })
      .catch(err => console.log(err))

    axios.get(API_URL + '/songsByGenere')
      .then(result => {
        setSongsByGenere(result.data)
      })
      .catch(err => console.log(err))

    axios.get(API_URL)
      .then(result => setSongs(result.data))
      .catch(err => console.log(err))

  }, [])

  const handleClose = () => {
    setShow(false)
  }

  const handleClickDelete = (id) => {
    setDeleteId(id)
    setShow(true);
  }

  const mutation = useMutation(() => deleteHandle(deleteId), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('songs')
    },

  })
  const handelDelete = async (id) => {
    // const res = await axios.delete(`${API_URL}/deleteSong/${id}`);
    // console.log('delete', {res})

    const res = useMutation('songs', async () => axios.delete(`${API_URL}/deleteSong/${id}`));

    handleClose();


    // axios.delete(API_URL+'/deleteSong/'+deleteId)
    // .then(res => {
    //   axios.get(API_URL)
    //   .then(result => setSongs(result.data))
    //   .catch(err => console.log(err))
    // })
    // .catch(err => console.log(err))
  }
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-danger"
              onClick={() => {
                mutation.mutate()
                handleClose()
              }} >Yes</button>
            <button type="button" className="btn btn-outline-dark"
              onClick={handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="w-100 bg-white rounded p-4">

        <Link to="/create" className="btn btn-success" style={{ width: "110px", marginRight: "750px" }}>Add</Link>
        <input type="text" placeholder="Search..."
          value={value} onChange={(e) => setValue(e.target.value)} />

        <table className="table">
          <thead>
            <tr>
              <th>Total # of Songs ({songsByTitle})</th>
              <th>Total # of Artists ({songsByArtist})</th>
              <th>Total # of Album ({songsByAlbum})</th>
              <th>Total # of Gener({songsByGenere})</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {
              data.filter((val) =>
                val.gener.toLowerCase().includes(value) || val.gener.toUpperCase().includes(value)).
                map((song) => {
                  return <tr key={song._id}>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.gener}</td>
                    <td><Link to={`/update/${song._id}`} className="btn btn-outline-primary p-2 ml-2">Update</Link>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger p-2 ml-5"
                        onClick={(e) =>
                          handleClickDelete(song._id)}>Delete</button></td>
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