import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import Categories from "./components/Categories";
import Queue from "./components/Queue";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [songsQueue, setSongsQueue] = useState([
    {
      id: 1,
      title: "Song 1",
      songSrc: "./assets/musics/song1.mp3",
      thumbnailSrc: "./assets/images/song1.png",
    },
    {
      id: 2,
      title: "Song 2",
      songSrc: "./assets/musics/song2.mp3",
      thumbnailSrc: "./assets/images/song2.png",
    },
    {
      id: 3,
      title: "Song 3",
      songSrc: "./assets/musics/song3.mp3",
      thumbnailSrc: "./assets/images/song3.png",
    },
    {
      id: 4,
      title: "Song 4",
      songSrc: "./assets/musics/song4.mp3",
      thumbnailSrc: "./assets/images/song4.png",
    },
   
  ]);

  const addToQueue = (song) => {
    setSongsQueue([...songsQueue, song]);
  };

  const deleteFromQueue = (title) => {
    setSongsQueue(
      songsQueue.filter((song) => {
        return song.title !== title;
      })
    );
  };

  const onDragEnd = (result)=>{
    console.log(result)
    const {source, destination} = result;
    if (!destination) return ;
    let songs = songsQueue,add;
    add=songs[source.index-1]
    songs.splice(result.draggableId-1,1)
    console.log(songs);
    songs.splice(destination.index-1,0,add)
    setSongsQueue(songs)

  }

  return (
    <DragDropContext onDragEnd={(result) => {onDragEnd(result)}}>
      <div className="app">
        <Categories addToQueue={addToQueue} />
        <MusicPlayer songsQueue={songsQueue} />
        <Queue songsQueue={songsQueue} deleteFromQueue={deleteFromQueue} />
      </div>
    </DragDropContext>
  );
}

export default App;
