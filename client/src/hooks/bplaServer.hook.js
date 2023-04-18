import { useRef } from 'react';
import http from '../axios.common';

export default function useBplaServer() {
  const formData = useRef(new FormData());

  function createBpla(onUploadProgress) {
    return http.post('/upload', formData.current, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  function getBplas() {
    return http.get('/bpla').then((res) => res.data);
  }

  function getBplaId(id) {
    return http.get('/bpla/' + id).then((res) => res.data);
  }

  return { formData, createBpla, getBplas, getBplaId };
}
