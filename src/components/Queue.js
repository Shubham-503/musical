import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./Queue.css";

const Queue = ({ songsQueue, deleteFromQueue }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <Droppable droppableId="queue">
      {(provided) => (
        <div
          className="queue"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3 
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            {" "}
            Queue
          </h3>
          
          <div
            className="queueList"
            style={{ display: `${isActive ? "block" : "none"}` }}
          >
            {provided.placeholder}

            {songsQueue.length !== 0 &&
              songsQueue.map((song) => {
                console.log(song)
                return (
                  
                  <Draggable draggableId={song.id.toString()} index={song.id} key={uuidv4()} >
                    
                    {(provided) => (
                      <div className="songQueue"  {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      > 
                        <span className="songName">{song.title}</span>
                        <button
                          className="btn_del_queue"
                          onClick={() => {
                            deleteFromQueue(song.title);
                          }}
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Queue;
