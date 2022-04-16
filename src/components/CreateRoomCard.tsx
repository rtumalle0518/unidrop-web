import { MouseEvent } from 'react';
import { Button, Card, Grid, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles'

type RoomCardProps = {
    onClick: (event: MouseEvent) => void;
}
const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding-top: 64px;
`
const StyledButton = styled(Button)`
    height: 80px;
    width: 160px;
`
export const CreateRoomCard = ({ onClick }: RoomCardProps) => {
  return (
        <Grid 
            container
            spacing={0}
            direction="column"
            justifySelf={'center'}
            justifyContent={'center'}
        >
            <Card>
                <CardContent>
                    <Typography variant='h3' gutterBottom>
                        Share your files instantly
                    </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1 }}> */}
                <StyledBox sx={{pb: 8}}>
                    <StyledButton onClick={onClick}>Create Room</StyledButton>
                </StyledBox>
            </Card>
        </Grid>
  )
}
