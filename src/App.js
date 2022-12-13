import './App.css';
import MusicPlayer from './components/MusicPlayer';
import Categories from './components/Categories';
import Queue from './components/Queue';
import { useState } from 'react';

function App() {
  const [songsQueue, setSongsQueue] = useState([
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

  const addToQueue = (song) => {
    setSongsQueue([...songsQueue,song])
  }
  
  const deleteFromQueue = (title) => {
    setSongsQueue(songsQueue.filter((song)=>{
      return song.title !== title
    }))
  }

  return (
    <div className="app">
      <Categories addToQueue={addToQueue}  />
      <MusicPlayer songsQueue={songsQueue}/>
      <Queue songsQueue={songsQueue} deleteFromQueue={deleteFromQueue}/>
    </div>
  );
}

export default App;
