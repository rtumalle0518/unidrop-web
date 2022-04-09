import { useEffect, MouseEvent, useState } from 'react'
import { io } from 'socket.io-client'
import { Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
    height: 100%;
    width: 100%;
`;
const socket = io('http://localhost:4000');

export const JoinRoomTest = () => {
    const [value, setValue] = useState('');
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Hello from Join Room')
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        })
    }, []);
    
    const handleClick = (event: MouseEvent): void => {
        console.log(value)
        socket.emit('join-room', {
            roomId: value,
        })
        
    }
    return (
        <Grid container spacing={1}>
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
    )
}
