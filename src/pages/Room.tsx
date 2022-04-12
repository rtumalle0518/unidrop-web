import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
type RoomProps = {
  connected: boolean,
  roomId: string,
  socket: any
}

export const Room = (prop: RoomProps) => {
  useEffect(() => {
    prop.socket.on('both-in-room', () => {
      console.log("We should get same message");
    })
  },[])
  return (
    <>
      {prop.connected ? 
        <div>Welcome to room!</div> :
        <div>Share this room id: {prop.roomId}</div>
      }
    </>
    
  )
}
