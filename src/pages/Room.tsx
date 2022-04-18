import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { metaData } from '../types'
type RoomProps = {
  connected: boolean,
  roomId: string,
  socket: Socket
}
interface incomingFiles extends metaData {
  fileUrl: string
}
// Change Component Names
export const Room = ({ connected, roomId, socket }: RoomProps) => {
  const [files, setFiles] = useState<incomingFiles[]>([])
  useEffect(() => {
    socket.on('file-received', (data: ArrayBuffer, metaData: metaData) => {
      const buffer = [data]
      // let link = document.createElement('a');
      // link.download = metaData.fileName;
      const blob = new Blob(buffer, {type: metaData.fileType})
      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onload = () => {
        const readerRes = reader.result as string;
        const file: incomingFiles = {
          fileName: metaData.fileName,
          fileType: metaData.fileType,
          fileUrl: readerRes
        }
        setFiles((list) => [...list, file])
        console.log(file)
        // link.click()
      }
      // If filetype pdf display a pdf lgo
      // If filetype is jpeg, png, jpg display the img itself
      // each of these things should have download button next to them
    })
  },[])
  return (
    <>
      {connected ? 
        <div>
          {files.map((file) => {
            return(
              <>
                <div>{file.fileName}</div>
                <a href={file.fileUrl} download={file.fileName}>Download</a>
              </>
              
            )
          })}
        </div> 
        :
        <div>Share this room id: {roomId}</div>
      }
    </>
    
  )
}
