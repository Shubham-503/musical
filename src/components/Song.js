import React from 'react'
import "./Song.css"

const Song = ({song,addToQueue}) => {
  return (
    <div className="song">
      <span className='songName'>{song.title}</span>
      <button className='btn_add_queue' onClick={()=>{addToQueue(song)}}>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default Song