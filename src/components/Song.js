import React from 'react'
import "./Song.css"

const Song = ({song}) => {
  return (
    <div className="song">
      <span className='songName'>{song.title}</span>
      <button className='btn_add_queue'>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default Song