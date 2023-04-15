import React, { useState, useEffect } from 'react';
import { useSaveValueOnChange } from '../hooks/saveValueOnChange.hook';

import { Typography, Button, IconButton, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch, useSelector } from 'react-redux';
import { setPhoto } from '../store/currentBplaSlice';

function base64ToFile(base64, filename, mimeType) {
  const binaryData = window.atob(base64);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

function convertBase64ToBlob(base64Image) {
  // Split into two parts
  const parts = base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Create filename based on getting data
  const filename = imageType.split('/').join('.');

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // BLOB image after conversion
  const blob = new Blob([uInt8Array], { type: imageType });
  return new File([blob], filename, { type: imageType });
}

export default function UploadImages({ triggerChange, handleSave }) {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [images, setImages] = useState(null);
  const photos = useSelector((state) => state.currentBpla.photos);
  /////////////////////////
  //   const dispatch = useDispatch();
  //   const [isSave, setIsSave] = useState(0);
  //   const photo = useSelector((state) => state.currentBpla.photo);
  //   useEffect(() => {
  //     if (photo == null) return;
  //     console.log(photo);
  //     //const file = convertBase64ToBlob(photo);
  //     console.log('1', photo);
  //     setCurrentFile(photo);
  //   }, []);

  //   useEffect(() => {
  //     if (currentFile) {
  //       //   const reader = new FileReader();
  //       //   reader.onload = (e) => {
  //       //     dispatch(setPhoto(e.target.result));
  //       //   };
  //       //   reader.readAsDataURL(currentFile);
  //       dispatch(setPhoto(currentFile));
  //     }
  //     setIsSave((prev) => prev + 1);
  //   }, [triggerChange]);

  // useEffect(() => {
  //   console.log('2', currentFile);
  // }, [currentFile]);

  useEffect(() => {
    if (photos == null) return;

    setImages(photos);
  }, []);

  const { isSave } = useSaveValueOnChange(images, 'photos', triggerChange);
  useEffect(() => {
    handleSave();
  }, [isSave]);

  const selectFile = (event) => {
    setCurrentFile(URL.createObjectURL(event.target.files[0]));

    setImages((prev) => [URL.createObjectURL(event.target.files[0]), ...prev]);
  };

  const deleteFile = (id) => {
    if (id == 0) {
      setCurrentFile(undefined);
    }
    setImages(images.filter((_, index) => index != id));
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
            src={currentFile}
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
                onClick={() => deleteFile(index)}>
                <ClearIcon />
              </IconButton>
              <img src={image} alt={image.name} width="50%" className="mr20" />
            </ListItem>
          ))}
      </ul>
    </>
  );
}
