import { MouseEvent } from 'react';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { MetaData } from '../types';
import { Button, IconButton, Card, CardContent, Typography} from '@mui/material';
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
        <Card sx={{width: '30%', marginBottom: 2, backgroundColor: '#6972a3'}}>
            <CardContent>
                <Typography gutterBottom variant='h5'>
                    {file.fileName}
                </Typography>
            </CardContent>
            <CardContent>
                <FileTypeIcon fileType={file.fileType}/>
            </CardContent>
            <IconButton onClick={handleClick} color='primary' size='large'>
                <FileDownloadRoundedIcon />
            </IconButton>
        </Card>
    )
}
