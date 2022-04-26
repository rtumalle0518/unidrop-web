import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Card, Tooltip, CardContent, Typography, Box, CardActionArea, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles'
// import QRCode from "react-qr-code";
import { QRCodeSVG } from 'qrcode.react';
import LoadingButton from '@mui/lab/LoadingButton';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { storage } from '../firebase/firebaseConfig';
const UniDropIcon = require('../images/UniDropIcon.png')
// require('dotenv').config();

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
    mediaUrl: string[];
}
export const ShareRoomCard = ({ roomId }: ShareRoomCardProps) => {
    const [qrurl, setQrurl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<messageBody>(
        {
            to: '',
            body: roomId,
            mediaUrl: []
        });
    
    useEffect(() => {
        console.log(process.env.REACT_APP_FIREBASE_API_KEY)
        const storageRef = ref(storage, `files/${roomId}`)
        QRCode.toDataURL(roomId)
            .then(dataurl => {
                const buff = atob(dataurl.split(',')[1])
                const mimeString = dataurl.split(',')[0].split(':')[1].split(';')[0]
                const ab = new ArrayBuffer(buff.length)
                const ia = new Uint8Array(ab);
                for (var i = 0; i < buff.length; i++) {
                    ia[i] = buff.charCodeAt(i);
                }
                const blob = new Blob([ab], {type: mimeString});
              
                const uploadTask = uploadBytesResumable(storageRef, blob);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setQrurl(downloadUrl);
                        setMessage({...message, mediaUrl:[downloadUrl]})
                        console.log('File available at', downloadUrl);
                    })
                }
                )
            })
        
    }, [])


    const onSubmit = () => {
        setSubmitting(true)
        fetch(`https://limitless-tundra-34178.herokuapp.com/api/messages`, {
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
                    to: '1',
                    body: roomId,
                    mediaUrl: []
                });
            }).catch(reason => {
                setSubmitting(false);
                setError(true);
                console.log(reason)
            });
    }
    return (
        <div>
            <Card sx={{paddingRight:'5px', paddingLeft:'10px', borderRadius: '24px', display: 'flex'}}>
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
                        {/* <TextField 
                                label={error ? 'Enter Valid Phone Number' : 'Enter Phone Number'}
                                variant="outlined"
                                name="phone"
                                value={message.to}
                                onChange={e => {
                                    setMessage({...message, to: e.target.value})
                                }}
                                error={error}
                        /> */}
                        <PhoneInput 
                            country={'us'}
                            value={message.to}
                            onChange={e => {
                                setMessage({...message, to: e})
                                console.log(e)
                            }}
                            countryCodeEditable={false}
                            onlyCountries={['us', 'ca']}
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
