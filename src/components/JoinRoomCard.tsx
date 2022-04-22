import { MouseEvent, useEffect, useState } from 'react';
import { Button, Card, TextField, CardContent, Typography, Box, CardActionArea, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles'
import { QrReader } from 'react-qr-reader';
import { ViewFinder } from './ViewFinder';
import { Socket } from 'socket.io-client';

type JoinRoomCardProps = {
    socket: Socket;
}
const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`
const StyledButton = styled(Button)`
    height: 80px;
    width: 160px;
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
export const JoinRoomCard = ({ socket }: JoinRoomCardProps) => {
    const [data, setData] = useState('No Result');
    const [value, setValue] = useState('');
    const handleClick = (event: MouseEvent): void => {
        console.log(value)
        // socket.emit('join-room', {
        //     roomId: value,
        //     socketId: socket.id,
        //     //Give information of platform used this is file sender btw
        // })
        
    }
    return (
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
    )
}
