import { useRef } from 'react';
import http from '../axios.common';

export default function useUploadFiles() {
  const formData = useRef(new FormData());

  function upload(onUploadProgress) {
    return http.post('/upload', formData.current, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  function getFiles() {
    return http.get('/files');
  }

  function getFileId(id) {
    return http.get('/bpla/' + id, { responseType: 'blob' }).then((res) => {
      return new File([res.data], 'photo');
    });
  }

  return { formData, upload, getFiles, getFileId };
}
