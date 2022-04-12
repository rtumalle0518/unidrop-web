import { useState, MouseEvent, useEffect } from 'react';
import { Button } from '@mui/material';
import { io } from 'socket.io-client';
import { Room } from './Room';
import { Socket } from 'socket.io';

const socket = io('http://localhost:4000');
export const CreateRoom = () => {
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState('');
  const [userConnected, setUserConnected] = useState(false);
  const [userWaiting, setUserWaiting] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Hello from create room')
    })
    socket.on("user-connected", () => {
      console.log('Did this work?')
      setUserConnected(true);
    })
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    })
  }, []);

  function generateID(): string {
    return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
			Math.random() * 999
		)}-${Math.trunc(Math.random() * 999)}`;
  }

  const handleClick = (event: MouseEvent): void => {
    setFlag(!flag);
    let generatedId = generateID();
    setId(generatedId);
    setUserWaiting(true);
    handleRoom(generatedId);
  }
  const handleRoom = (room: string) => {
    socket.emit('create-room', {
      roomId: room,
    })
  }
  
  // once handshake done 
  return (
    <>
      {userWaiting ? <Room connected={userConnected} roomId={id} socket={socket}/> : 
        <>
          {/* Probably make this form its own component */} 
          <div>Share your files securely</div>
          <Button onClick={handleClick}>Create Room</Button>
        </>
      }
    </>
  )
}
