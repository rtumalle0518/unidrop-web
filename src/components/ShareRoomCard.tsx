import { useState } from 'react';
import QRCode from 'qrcode';
import { Card, Tooltip, CardContent, Typography, Box, CardActionArea, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles'
// import QRCode from "react-qr-code";
import { QRCodeSVG } from 'qrcode.react';
import LoadingButton from '@mui/lab/LoadingButton';
const UniDropIcon = require('../images/UniDropIcon.png')


type ShareRoomCardProps = {
    roomId: string;
}
const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`
// const StyledButton = styled(Button)`
//     height: 80px;
//     width: 160px;
// `

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
type messageBody = {
    to: string;
    body: string;
}
export const ShareRoomCard = ({ roomId }: ShareRoomCardProps) => {
    
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<messageBody>(
        {
            to: '',
            body: roomId
        });

    
    const onSubmit = () => {
        setSubmitting(true)
        fetch(`http://localhost:4000/api/messages`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          })
            .then(res => {
                res.json()
                console.log(res)
            })
            .then(data => {
                console.log(data)
                setError(false);
                setSubmitting(false);
                setMessage({
                    to: '',
                    body: roomId
                });
            }).catch(reason => {
                setSubmitting(false);
                setError(true);
                console.log(reason)
            });
    }
    return (
        <div>
            <Card sx={{paddingRight:'5px', paddingLeft:'5px', borderRadius: '24px', display: 'flex'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '64px', marginLeft: '8px' }}>
                    <CardContent sx={{marginTop: '16px'}}>
                        <Typography variant='h4' gutterBottom>
                            Share this room id
                        </Typography>
                        <Typography variant='h4' gutterBottom>
                            to a device
                        </Typography>
                    </CardContent>
                    <Tooltip title='click to copy'>
                        <StyledCardActionArea  
                            onClick={() => {
                                navigator.clipboard.writeText(roomId);
                                console.log(roomId)
                                setCopied(true)
                            }}
                            
                        >
                            {roomId}
                        </StyledCardActionArea>
                    </Tooltip>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1 }}> */}
                    <StyledBox sx={{flexDirection:'column', paddingTop:'32px'}}>
                        <TextField 
                                label={error ? 'Enter Valid Phone Number' : 'Enter Phone Number'}
                                variant="outlined"
                                name="phone"
                                value={message.to}
                                onChange={e => {
                                    setMessage({...message, to: e.target.value})
                                }}
                                error={error}
                        />
                        <LoadingButton onClick={onSubmit} loading={submitting}>Send Room ID</LoadingButton>
                    </StyledBox>
                    <StyledBox sx={{pb: 8, paddingTop:'32px'}}>
                        <Typography variant='h6' gutterBottom>
                            or join with QR Code
                        </Typography>
                    </StyledBox>
                </Box>
                <StyledBox sx={{marginRight: '32px'}}>
                    <QRCodeSVG 
                        value={roomId}
                        size={256}
                        imageSettings={{
                            src: UniDropIcon,
                            excavate: true,
                            width: 256 * .2,
                            height: 256 * .2 
                        }}
                    />
                </StyledBox>
                
            </Card>
        </div>
    )
}
