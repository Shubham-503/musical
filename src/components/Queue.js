import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import "./Queue.css"

const Queue = ({ songsQueue }) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <div className='queue' >
      <h3 onClick={() => { setIsActive(!isActive) }}> Queue</h3>

      <div className="queueList" style={{ display: `${isActive ? "block" : "none"}` }}>
        {songsQueue.map((song) => {
          return (
            <div className="songQueue" key={uuidv4()}>
              <span className='songName'>{song.title}</span>
              <button className='btn_del_queue'>
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Queue