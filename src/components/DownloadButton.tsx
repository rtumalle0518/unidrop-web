import { MouseEvent } from 'react';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { MetaData } from '../types';
import { Button } from '@mui/material';

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
        <div>
            <div>{file.fileName}</div>
            <Button onClick={handleClick} endIcon={<FileDownloadRoundedIcon />}>Download</Button>
        </div>
    )
}
