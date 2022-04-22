import { useState } from 'react';
import { Card, Tooltip, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles'
import QRCode from "react-qr-code";

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
export const ShareRoomCard = ({ roomId }: ShareRoomCardProps) => {
    const [copied, setCopied] = useState(false);
    
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
                    <StyledBox sx={{pb: 8, paddingTop:'64px'}}>
                        <Typography variant='h6' gutterBottom>
                            or join with QR Code
                        </Typography>
                    </StyledBox>
                </Box>
                <StyledBox sx={{marginRight: '32px'}}>
                    <QRCode value={roomId} />
                </StyledBox>
                
            </Card>
        </div>
    )
}
