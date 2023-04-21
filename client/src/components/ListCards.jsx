import { useEffect, useState } from 'react';
import BplaCard from './BplaCard';

import Grid from '@mui/material/Grid';
import useBplaServer from '../hooks/bplaServer.hook';
import { Typography } from '@mui/material';
import Loader from './Loader';

export default function ListCards({ sx }) {
  const [bplas, setBplas] = useState([]);
  const { getBplas, isLoading } = useBplaServer();

  async function getListBpla() {
    setBplas(await getBplas());
  }

  useEffect(() => {
    getListBpla();
  }, []);

  if (isLoading) {
    return <Loader sx={sx} />;
  }

  if (bplas.length === 0) {
    return (
      <Typography variant="h4" color="Highlight" container textAlign="center" sx={sx}>
        За заданними параметрами не знайдено жодного БпЛА :(
      </Typography>
    );
  }

  return (
    <Grid container spacing={1} sx={sx} py={2}>
      {bplas.map((bpla) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={4} key={bpla._id}>
          <BplaCard
            idBpla={bpla._id}
            title={bpla._name + ' ' + bpla.model}
            preview={bpla?.photos[0]}>
            {bpla.shortDescription}
          </BplaCard>
        </Grid>
      ))}
    </Grid>
  );
}
