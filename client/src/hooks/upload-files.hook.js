import http from '../axios.common';

export default function useUploadFiles() {
  function upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append('file', file);

    return http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  function getFiles() {
    return http.get('/files');
  }

  return { upload, getFiles };
}
