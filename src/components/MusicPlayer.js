import React, { useEffect, useRef, useState } from 'react'
import "./MusicPlayer.css"

const MusicPlayer = () => {
  const [songsQueue, setSongsQueue] = useState([
    {
      title: "Song 1",
      songSrc: "./assets/musics/song1.mp3",
      thumbnailSrc: "./assets/images/song1.png",
    },
    {
      title: "Song 2",
      songSrc: "../assets/musics/song2.mp3",
      thumbnailSrc: "../assets/images/song2.png",
    },
    {
      title: "Song 3",
      songSrc: "../assets/musics/song3.mp3",
      thumbnailSrc: "../assets/images/song3.png",
    },
    {
      title: "Song 4",
      songSrc: "../assets/musics/song4.mp3",
      thumbnailSrc: "../assets/images/song4.png",
    },
  ])
  const [title, setTitle] = useState("")
  const [audioSrc, setAudioSrc] = useState("")
  const [imgSrc, setImgSrc] = useState("")
  const [songCount, setSongCount] = useState(0)
  const audio = document.querySelector('.audio')
  // const [audio, setAudio] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioElement = useRef(null);


  const loadSong = (song) => {
    setTitle(song.title)
    setAudioSrc(song.songSrc)
    setImgSrc(song.thumbnailSrc)
    // setAudio(new Audio(song))
    // audioElement.current.play()


  }

  const playAudio =async () => {
    if (!isPlaying) {
      console.log("playAudio",audio);
      audioElement.current.play()
      // playBtn.querySelector("i").classList.remove("fa-play");
      // playBtn.querySelector("i").classList.add("fa-pause");
      setIsPlaying(true)
    } else {
      audioElement.current.pause()
      // playBtn.querySelector("i").classList.add("fa-play");
      // playBtn.querySelector("i").classList.remove("fa-pause");
      setIsPlaying(false) 
    }
    // console.log(audio.currentTime);
  }

  useEffect(() => {
    loadSong(songsQueue[songCount])
  }, [])

  return (
    <>
      <div className="music-container">
        <div className="img-container">
          <img className="img" src="../assets/images/song1.png" alt="" />
        </div>

        <audio className="audio" src={audioSrc} ref={audioElement}></audio>

        <h1 className="title">{title}</h1>
        <div className="controller-div">
          <div className="controller">
            {/* <input type="range" value="30" className="controller-input" /> */}
            <div className="controller-music"></div>
          </div>
          <div className="controller-time">
            <span className="currentTime">01:30 </span>
            <span className="time-separator"> / </span>
            <span className="songDuration">05:00</span>
          </div>
        </div>

        <div className="functions">
          <button className="btn-prev">
            <i className="fa-solid fa-backward-step"></i>
          </button>

          <button className="btn-play btn-large" onClick={() => playAudio()}>
            <i className={`fa-solid  ${isPlaying?"fa-pause":"fa-play"}`}></i>
          </button>

          <button className="btn-next">
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>
    </>

  )
}

export default MusicPlayer