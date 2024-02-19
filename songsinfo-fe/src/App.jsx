import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Song from './SongInfo'
import CreateSongs from './CreateSongsInfo'
import UpdateSong from './UpdateSongInfo'

function App() {
  const [count, setCount] = useState()

  return (
   <div>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Song/>}></Route>
      <Route path='/create' element={<CreateSongs/>}></Route>
      <Route path='/update/:id' element={<UpdateSong/>}></Route>
     </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
