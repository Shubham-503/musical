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
  const [songDuration, setSongDuration] = useState("00:00")
  const [progressPrecent, setProgressPrecent] = useState(0)
  const [volumeInp, setVolumeInp] = useState(0.5)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const audioElement = useRef(null);



  const loadSong = (song) => {
    setTitle(song.title)
    setAudioSrc(song.songSrc)
    setImgSrc(song.thumbnailSrc)
  }

  const nextAudio = async () => {

    if(isShuffle) {
      let rand;
        while(true){
         rand = Math.floor(Math.random()*songsQueue.length)
         console.log('rand: ',rand);
         console.log('videoCount: ',songCount);
        if (rand === songCount) {
            // rand=videoCount;
            continue;
        };
        if (rand !== songCount) break;
        }
        setSongCount(rand)
        return;
    }

    // audioElement.current.pause()
    setSongCount((songCount + 1) % songsQueue.length);
    loadSong(songsQueue[songCount])
    // setIsPlaying(false);
    // playAudio();
  }

  const prevAudio = () => {

    if (songCount - 1 < 0) {
      setSongCount(songsQueue.length - 1);
    } else {
      setSongCount(songCount - 1);
    }
    console.log(songCount);
    loadSong(songsQueue[songCount])
    // setIsPlaying(false);
    // playAudio();
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
    // console.log(audio.currentTime);
  }

  function updateProgress() {
    const currentTime = audioElement.current.currentTime;
    //   console.log("update functon", audio);
    const duration = audioElement.current.duration;
    const pgPrecent = (currentTime / duration) * 100;
    //   console.log(currentTime, duration);
    //   convertSecToMin(sec)
    setCurrentTime(convertSecToMin(audioElement.current.currentTime));
    setSongDuration(convertSecToMin(audioElement.current.duration));
    // MusicController.style.width = `${progressPrecent}%`;
    setProgressPrecent((currentTime / duration) * 100)
    if (audioElement.current.ended) nextAudio();
  }

  function convertSecToMin(sec) {
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    return `${m}:${s}`;
  }

  function convertMintoSec(min) {
    let [m, s] = min.split(":")
    const time = Number(m) * 60 + Number(s)
    return time
  }

  const controlFromController = (e) => {
    //   console.log("e.currentTarget.offsetWidth", e.currentTarget.offsetWidth);
    //   console.log("e.currentTarget.offsetLeft", e.currentTarget.offsetLeft);
    //   console.log("e.pageX", e.pageX);
    // controller.addEventListener("mousemove1", controllerDragStart);

    const controllerPositionFromLeft = e.currentTarget.offsetLeft;
    const controllerWidth = e.currentTarget.offsetWidth;
    let controllerMouseClick = e.pageX;
    let progPrecent =
      ((controllerMouseClick - controllerPositionFromLeft) / controllerWidth) *
      100;

    setProgressPrecent(progPrecent)
    audioElement.current.currentTime = convertMintoSec(currentTime);
    convertSecToMin(currentTime);
  };

  const handleVolInp = (e) => {
    setVolumeInp(e.target.value)
    audioElement.current.volume = e.target.value
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
    if (songsQueue.length === 0) return ;
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
          <div className="controller" onClick={controlFromController}>
            {/* <input type="range" value="30" className="controller-input" /> */}
            <div className="controller-music" style={{ width: `${progressPrecent}%` }}></div>
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

            <div className="volume-progress">
              <input type="range" min="0" max="1" step=".1" name="volume-progress-range"
                id="volume-progress-range" className="volume-progress-range" value={volumeInp} onInput={(e) => { handleVolInp(e) }} style={{background:`linear-gradient(to right, #fd297a 0%, #fd297a ${volumeInp*100}%, #9424f0  ${volumeInp*100}%, #9424f0 100%)`}} />
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
          <button className="btn-control btn-repeat" onClick={()=>loopSong()} style={{color: `${isRepeat?"red":"white"}`}}>
            <i className="fa-solid fa-repeat" ></i>
          </button>

          <button className="btn-control btn-shuffle" onClick={shuffleSong} style={{color: `${isShuffle?"red":"white"}`}} >
            <i className="fa-solid fa-shuffle"></i>
          </button>
          </div>

        </div>
      </div>
    </>

  )
}

export default MusicPlayer