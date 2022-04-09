import { useState, MouseEvent, useEffect } from 'react';
import { Button } from '@mui/material';
import { io } from 'socket.io-client';


export const CreateRoom = () => {
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.on('connect', () => {
      console.log('lets go?')
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
    setFlag(!flag)
    setId(generateID())
  }
  // once handshake done 
  return (
    <>
      <div>Share your files securely</div>
      <Button onClick={handleClick}>Create Room</Button>
      {id ? <div>{id}</div> : <></>}
    </>
  )
}
