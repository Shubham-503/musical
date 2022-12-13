import React, { useState } from 'react'
import { v4 as uuidv4} from "uuid"
import Song from './Song'
import "./Categories.css"

const Categories = ({addToQueue}) => {
  const [songs, setSongs] = useState([
    {
      title: "Song 1",
      songSrc: "./assets/musics/song1.mp3",
      thumbnailSrc: "./assets/images/song1.png",
    },
    {
      title: "Song 2",
      songSrc: "./assets/musics/song2.mp3",
      thumbnailSrc: "./assets/images/song2.png",
    },
    {
      title: "Song 3",
      songSrc: "./assets/musics/song3.mp3",
      thumbnailSrc: "./assets/images/song3.png",
    },
    {
      title: "Song 4",
      songSrc: "./assets/musics/song4.mp3",
      thumbnailSrc: "./assets/images/song4.png",
    },
  ])
  return (
    <div className='categories'>
      <h2>Songs</h2>
      {songs.map((song)=>{
        return <Song song={song} key={uuidv4()} addToQueue={addToQueue} />
      })}
      {/* <Song /> */}
    </div>
  )
}

export default Categories