import { useEffect, useState, MouseEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@mui/material';
import { MetaData } from '../types'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { DownloadButton } from '../components/DownloadButton';

type RoomProps = {
  connected: boolean,
  roomId: string,
  socket: Socket
}
export interface incomingFiles extends MetaData {
  fileUrl: string
}
// Change Component Names
export const Room = ({ connected, roomId, socket }: RoomProps) => {
  const [files, setFiles] = useState<incomingFiles[]>([])
  useEffect(() => {
    socket.on('file-received', (data: ArrayBuffer, metaData: MetaData) => {
      const buffer = [data]
      // let link = document.createElement('a');
      // link.download = metaData.fileName;
      const blob = new Blob(buffer, {type: metaData.fileType})
      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onload = () => {
        const readerRes = reader.result as string;
        // link.href = readerRes
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
      // Idea to make it look like button do what the guy did above with creating anchor tag and doing link.click when button is clicked
    })
  },[])
  
  return (
    <>
      {connected ? 
        <div>
          {files.map((file) => {
            return(
              <>
                <DownloadButton fileName={file.fileName} fileType={file.fileType} fileUrl={file.fileUrl}/>
                {/* <div>{file.fileName}</div>
                <a href={file.fileUrl} download={file.fileName}>Download</a>
                <Button endIcon={<FileDownloadRoundedIcon />} onClick={handleClick}>Download</Button> */}
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
