import { useRef, useState } from 'react';
import http from '../axios.common';

export default function useBplaServer() {
  const [isLoading, setIsLoading] = useState(true);
  const formData = useRef(new FormData());

  function createBpla(onUploadProgress) {
    setIsLoading(true);
    return http
      .post('/upload', formData.current, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      })
      .then((res) => {
        setIsLoading(false);
        return res;
      });
  }

  function getBplas() {
    setIsLoading(true);
    return http.get('/bpla').then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  function getBplaId(id) {
    setIsLoading(true);
    return http.get('/bpla/' + id).then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  return { formData, createBpla, getBplas, getBplaId, isLoading };
}
