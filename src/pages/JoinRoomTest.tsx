import { useEffect, MouseEvent, useState } from 'react'
import { io } from 'socket.io-client'
import { Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FileShare } from './FileShare';

const StyledButton = styled(Button)`
    height: 100%;
    width: 100%;
`;
//const socket = io('http://localhost:4000');
const socket = io('https://limitless-tundra-34178.herokuapp.com/');

export const JoinRoomTest = () => {
    const [value, setValue] = useState('');
    const [roomReady, setRoomReady] = useState(false);
    useEffect(() => {
        console.log(socket)
        socket.on('connect', () => {
            console.log('Hello from Join Room')
        })
        socket.on('in-room', () => {
            setRoomReady(true);
            console.log('In room')
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        })
        socket.on('both-in-room', () => {
            console.log("We should get same message");
        })
    }, []);
    
    const handleClick = (event: MouseEvent): void => {
        console.log(value)
        socket.emit('join-room', {
            roomId: value,
            socketId: socket.id
        })
        
    }
    return (
        <>
            {roomReady ? <FileShare socket={socket} roomId={value}/> :
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <TextField 
                            label="Enter Room ID" 
                            variant="outlined"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <StyledButton onClick={handleClick}>Join Room</StyledButton>
                    </Grid>
                </Grid> 
            }
        </>
    )
}
