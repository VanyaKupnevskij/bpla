import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImagesCarousel from '../components/ImagesCarousel';
import TableParameters from '../components/TableParameters';
import useBplaServer from '../hooks/bplaServer.hook';
import { Container } from '@mui/material';

export default function DetailPage() {
  const [data, setData] = useState(null);
  const { getBplaId, isLoading } = useBplaServer();
  const bplaId = useParams().id;

  async function getBpla() {
    setData(await getBplaId(bplaId));
  }

  useEffect(() => {
    getBpla();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      {!isLoading && (
        <>
          <ImagesCarousel images={data.photos} />
          <TableParameters datas={data} />
        </>
      )}
    </Container>
  );
}
