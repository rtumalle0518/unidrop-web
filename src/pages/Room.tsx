import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
type RoomProps = {
  connected: boolean,
  roomId: string,
  socket: Socket
}
// Change Component Names
export const Room = ({ connected, roomId, socket }: RoomProps) => {
  useEffect(() => {
    socket.on('file-received', (data: ArrayBuffer, metaData: any) => {
      let buffer = []
      buffer.push(data)
      let link = document.createElement('a');
      link.download = metaData.fileName;
      const blob = new Blob(buffer, {type: metaData.fileType})
      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onload = () => {
        link.href = reader.result as string;
        link.click()
      }
      // If filetype pdf display a pdf lgo
      // If filetype is jpeg, png, jpg display the img itself
      // each of these things should have download button next to them
    })
  },[])
  return (
    <>
      {connected ? 
        <div>Welcome to room!</div> :
        <div>Share this room id: {roomId}</div>
      }
    </>
    
  )
}
