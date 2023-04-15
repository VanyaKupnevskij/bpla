import React, { useState, useEffect } from 'react';
import { useSaveValueOnChange } from '../hooks/saveValueOnChange.hook';

import { Typography, Button, IconButton, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch, useSelector } from 'react-redux';
import { setPhoto } from '../store/currentBplaSlice';

export default function UploadImages({ triggerChange, handleSave }) {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [images, setImages] = useState([]);
  /////////////////////////
  const dispatch = useDispatch();
  const [isSave, setIsSave] = useState(0);
  const photo = useSelector((state) => state.currentBpla.photo);
  useEffect(() => {
    console.log('1', photo && URL.createObjectURL(new File([photo], 'loaded_Photo')));
    setCurrentFile(
      photo &&
        new File([photo], 'radar.png', {
          type: 'image/png',
        }),
    );
  }, []);

  useEffect(() => {
    if (currentFile) dispatch(setPhoto(URL.createObjectURL(currentFile)));
    setIsSave((prev) => prev + 1);
  }, [triggerChange]);

  useEffect(() => {
    console.log('2', currentFile);
  }, [currentFile]);
  //   const { isSave } = useSaveValueOnChange(images, 'photos', triggerChange);
  useEffect(() => {
    handleSave();
  }, [isSave]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);

    setImages((prev) => [event.target.files[0], ...prev]);
  };

  const deleteFile = (name) => {
    if (currentFile?.name == name) {
      setCurrentFile(undefined);
    }
    setImages(images.filter((image) => image.name != name));
  };

  return (
    <>
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button variant="outlined" component="span">
          Оберіть фото
        </Button>
      </label>
      <div>{currentFile ? currentFile.name : null}</div>

      {currentFile && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <img
            className="preview my20"
            src={URL.createObjectURL(currentFile)}
            alt="photo"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}

      <Typography variant="h6" className="list-header">
        Список завантажених фото:
      </Typography>
      <ul>
        {images &&
          images.map((image, index) => (
            <ListItem divider key={index}>
              <IconButton
                variant="text"
                color="secondary"
                sx={{ mr: 3 }}
                onClick={() => deleteFile(image.name)}>
                <ClearIcon />
              </IconButton>
              <img src={URL.createObjectURL(image)} alt={image.name} width="50%" className="mr20" />
            </ListItem>
          ))}
      </ul>
    </>
  );
}
