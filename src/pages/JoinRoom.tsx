import { useEffect, MouseEvent, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button, Card, TextField, CardContent, Typography, Box, CardActionArea, CardMedia, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FileShare } from './FileShare';
import { QrReader } from 'react-qr-reader';
import { ViewFinder } from '../components/ViewFinder';

const StyledButton = styled(Button)`
    height: 100%;
    width: 100%;
`;
//const socket = io('http://localhost:4000');
// const socket = io('https://limitless-tundra-34178.herokuapp.com/');
let socket: Socket;
const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`

const StyledCardActionArea = styled(CardActionArea)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    // border: 1px solid #cccccc;
    transition: all 0.5s;
    
    &:hover {
        background-color: rgb(219, 255, 219);
        border-color: rgb(0, 255, 0);
        box-shadow: 0px 2px 15px #0000ff61;
        padding: 1.5rem 3rem 1.5rem;
        font-weight: bolder;
        &::after {
            opacity: 1;
            transition: all 0.5s;
            color: #ffffff;
        }
    }
`
export const JoinRoom = () => {
    const [data, setData] = useState('No Result');
    const [value, setValue] = useState('');
    const [roomReady, setRoomReady] = useState(false);
    useEffect(() => {
        socket = io('https://limitless-tundra-34178.herokuapp.com/');
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
            socketId: socket.id,
            //Give information of platform used this is file sender btw
        })
        
    }
    return (
        <>
            {roomReady ? <FileShare socket={socket} roomId={value}/> :
                // <Grid container spacing={0}>
                //     <Grid item xs={4}>
                //         <TextField 
                //             label="Enter Room ID" 
                //             variant="outlined"
                //             value={value}
                //             onChange={e => setValue(e.target.value)}
                //         />
                //     </Grid>
                //     <Grid item xs={2}>
                //         <StyledButton onClick={handleClick}>Join Room</StyledButton>
                //     </Grid>
                // </Grid>
                <Stack
					spacing={6}
					direction="row"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "75vh" }}
				>
					<div>
                        <Card sx={{paddingRight:'5px', paddingLeft:'5px', borderRadius: '24px', display: 'flex'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '64px', marginLeft: '8px' }}>
                                <CardContent sx={{marginTop: '16px'}}>
                                    <Typography variant='h4' gutterBottom>
                                        Enter room id
                                    </Typography>
                                    <TextField 
                                        label="Enter Room ID" 
                                        variant="outlined"
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                    />
                                    <Button onClick={handleClick}>Join Room</Button>
                                </CardContent>
                                <StyledBox sx={{pb: 8, paddingTop:'64px'}}>
                                    <Typography variant='h6' gutterBottom>
                                        or join with QR Code
                                    </Typography>
                                </StyledBox>
                            </Box>
                            <StyledBox sx={{marginRight: '32px'}}>
                                <CardContent sx={{width: '25vw'}}>
                                    <QrReader
                                        onResult={(result, error) => {
                                            if (!!result) {
                                                setData(result.getText());
                                                setValue(result.getText());
                                                socket.emit('join-room', {
                                                    roomId: result.getText(),
                                                    socketId: socket.id,
                                                    //Give information of platform used this is file sender btw
                                                })
                                            }

                                            if (!!error) {
                                                console.info(error);
                                            }
                                        }}
                                        constraints={{
                                            facingMode: 'environment',
                                        }}
                                        videoId='video'
                                        scanDelay={100}
                                        ViewFinder={ViewFinder}
                                    />
                                    <p>{data}</p>
                                </CardContent>
                            </StyledBox>
                            
                        </Card>
                        
                    </div>
				</Stack> 
            }
        </>
    )
}
