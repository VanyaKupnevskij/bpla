import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Button, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import useUploadFiles from '../hooks/upload-files.hook';

const BorderLinearProgress = styled((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#EEEEEE',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function UploadImages() {
  const [currentFile, setCurrentFile] = useState();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [imageInfos, setImageInfos] = useState([]);

  const { getFiles, upload } = useUploadFiles();

  useEffect(() => {
    getFiles().then((response) => setImageInfos(response.data));
  }, []);

  const selectFile = (event) => {
    console.log(event.target.files[0]);
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage('');
  };

  const uploading = () => {
    setProgress(0);

    upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setIsError(false);
        return getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);
        setMessage('Could not upload the image!');
        setCurrentFile(undefined);
        setIsError(true);
      });
  };

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      <div className="file-name">{currentFile ? currentFile.name : null}</div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!currentFile}
        onClick={uploading}>
        Upload
      </Button>

      {currentFile && (
        <Box className="my20" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}

      {previewImage && (
        <div>
          <img className="preview my20" src={previewImage} alt="" />
        </div>
      )}

      {message && (
        <Typography variant="subtitle2" className={`upload-message ${isError ? 'error' : ''}`}>
          {message}
        </Typography>
      )}

      <Typography variant="h6" className="list-header">
        List of Images
      </Typography>
      <ul className="list-group">
        {imageInfos &&
          imageInfos.map((image, index) => (
            <ListItem divider key={index}>
              <img src={image.url} alt={image.name} height="80px" className="mr20" />
              <a href={image.url}>{image.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
}
