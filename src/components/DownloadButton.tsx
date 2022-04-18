import { MouseEvent } from 'react';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { MetaData } from '../types';
import { Box, IconButton, Card, CardContent, Typography} from '@mui/material';
import { FileTypeIcon } from './FileTypeIcon'

interface DownloadButtonProps extends MetaData {
    fileUrl: string
}
export const DownloadButton = (file: DownloadButtonProps) => {
    const handleClick = (event: MouseEvent): void => {
        let link = document.createElement('a');
        link.download = file.fileName;
        link.href = file.fileUrl;
        link.click();

    };
    return (
        <Card sx={{width: '100%', height: '100%', marginBottom: 2, backgroundColor: '#6972a3'}}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography gutterBottom variant='h5'>
                    {file.fileName}
                </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileTypeIcon fileType={file.fileType}/>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
                <IconButton onClick={handleClick} color='primary' size='large' sx={{backgroundColor: '#202124'}}>
                    <FileDownloadRoundedIcon />
                </IconButton>
            </Box>
            
        </Card>
    )
}
