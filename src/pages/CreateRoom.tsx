import { useState, MouseEvent} from 'react';
import { Button } from '@mui/material';


export const CreateRoom = () => {
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState('');
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
