import React, { useEffect, useRef, useState } from 'react'
import "./MusicPlayer.css"

const MusicPlayer = ({ songsQueue }) => {

  const [title, setTitle] = useState("")
  const [audioSrc, setAudioSrc] = useState("")
  const [imgSrc, setImgSrc] = useState("")
  const [songCount, setSongCount] = useState(0)
  const audio = document.querySelector('.audio')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [songDuration, setSongDuration] = useState()
  const [progressPrecent, setProgressPrecent] = useState(0)
  const [volumeInp, setVolumeInp] = useState(0.5)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [songProgress, setSongProgress] = useState(0)
  const audioElement = useRef(null);



  const loadSong = (song) => {
    setTitle(song.title)
    setAudioSrc(song.songSrc)
    setImgSrc(song.thumbnailSrc)
  }

  const nextAudio = async () => {

    if (isShuffle) {
      let rand;
      while (true) {
        rand = Math.floor(Math.random() * songsQueue.length)
        console.log('rand: ', rand);
        console.log('videoCount: ', songCount);
        if (rand === songCount) {
          continue;
        };
        if (rand !== songCount) break;
      }
      setSongCount(rand)
      return;
    }
    setSongCount((songCount + 1) % songsQueue.length);
    loadSong(songsQueue[songCount])
    setSongProgress(0)
  }

  const prevAudio = () => {

    if (songCount - 1 < 0) {
      setSongCount(songsQueue.length - 1);
    } else {
      setSongCount(songCount - 1);
    }
    console.log(songCount);
    loadSong(songsQueue[songCount])
    setSongProgress(0)
  }

  const playAudio = () => {
    if (!isPlaying) {
      console.log("playAudio", audio);
      audioElement.current.play()
      setIsPlaying(true)
    } else {
      console.log("pauseAudio", audio);
      setIsPlaying(false)
    }
  }

  function updateProgress() {
    const currentTime = audioElement.current.currentTime;
    const duration = audioElement.current.duration;
    const pgPrecent = (currentTime / duration) * 100;
    setCurrentTime(convertSecToMin(audioElement.current.currentTime));
    setSongDuration(convertSecToMin(audioElement.current.duration));
    setSongProgress((currentTime / duration) * 100)
    setProgressPrecent((currentTime / duration) * 100)
    if (audioElement.current.ended) nextAudio();
  }

  function convertSecToMin(sec) {
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    return `${m}:${s}`;
  }
 
  const handleVolInp = (e) => {
    setVolumeInp(e.target.value)
    audioElement.current.volume = e.target.value
  }

  const handleSongDurationInput = (e) => {
    console.log(e.target.value);
    setSongProgress(e.target.value)
    // audioElement.current.currentTime = e.target.value  
    audioElement.current.currentTime = ((Number(e.target.value) * Number(audioElement.current.duration)) / 100)
  }

  const loopSong = () => {
    console.log(('loopSong Clicked'))
    console.log(audioElement.current.loop)
    if (!audioElement.current.loop) {
      audioElement.current.loop = true;
      // loopBtn.querySelector('i').style.color = "red"
    }
    else {
      audioElement.current.loop = false;
      // loopBtn.querySelector('i').style.color = "white"

    }
    setIsRepeat(!isRepeat)
  }

  const shuffleSong = () => {
    setIsShuffle(!isShuffle)
    if (!isShuffle) {
      setIsShuffle(true)
    }
    else {
      setIsShuffle(false)
    }
  }

  useEffect(() => {
    if (songsQueue.length === 0) return;
    loadSong(songsQueue[songCount])
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  })

  return (
    <>
      <div className="music-container">
        <div className="img-container">
          <img className="img" src={imgSrc} alt="" />
        </div>

        <audio className="audio" src={audioSrc} ref={audioElement} onTimeUpdate={updateProgress} ></audio>

        <h1 className="title">{title}</h1>
        <div className="controller-div">
          <div className="controller" >
            <input type="range" min="0" max="100" id='player-current-progress'  value={songProgress} onInput={(e) => { handleSongDurationInput(e) }} style={{ background: `linear-gradient(to right, #fd297a 0%, #fd297a ${songProgress}%, #9424f0  ${songProgress}%, #9424f0 100%)` }} />
            {/* <div className="controller-music" style={{ width: `${progressPrecent}%` }}></div> */}
          </div>
          <div className="controller-time">
            <span className="currentTime"  >{currentTime} </span>
            <span className="time-separator"> / </span>
            <span className="songDuration">{songDuration}</span>
          </div>
        </div>

        <div className="functions">
          <div className="volume-control">
            <button className="btn-control btn-volume">
              <i className="fa-solid fa-volume-high"></i>
            </button>

            <div className="volume-progress" >
              <input type="range" min="0" max="1" step=".1" name="volume-progress-range" 
                id="volume-progress-range" className="volume-progress-range" value={volumeInp} onInput={(e) => { handleVolInp(e) }} style={{ background: `linear-gradient(to right, #fd297a 0%, #fd297a ${volumeInp * 100}%, #9424f0  ${volumeInp * 100}%, #9424f0 100%)` }} />
            </div>
          </div>
          <div className="btn-controls">
            <button className="btn-prev" onClick={() => prevAudio()}>
              <i className="fa-solid fa-backward-step"></i>
            </button>

            <button className="btn-play btn-large" onClick={() => playAudio()}>
              <i className={`fa-solid  ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
            </button>

            <button className="btn-next" onClick={() => nextAudio()}>
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>
          <div className="functions-controls">
            <button className="btn-control btn-repeat" onClick={() => loopSong()} style={{ color: `${isRepeat ? "#fd297a" : "white"}` }}>
              <i className="fa-solid fa-repeat" ></i>
            </button>

            <button className="btn-control btn-shuffle" onClick={shuffleSong} style={{ color: `${isShuffle ? "#fd297a" : "white"}` }} >
              <i className="fa-solid fa-shuffle"></i>
            </button>
          </div>

        </div>
      </div>
    </>

  )
}

export default MusicPlayer