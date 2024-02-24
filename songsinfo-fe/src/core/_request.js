import axios from "axios"

var API_URL = "http://localhost:3001"

const getAllSongs = async () => {
    const res = await axios.get(API_URL)
    return res.data
}

const deleteHandle = async (deleteId) => {
    const res = await axios.delete(`${API_URL}/deleteSong/${deleteId}`)
    console.log({ res })
}

export { deleteHandle, getAllSongs }   