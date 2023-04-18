import { useEffect, useState } from 'react';
import BplaCard from './BplaCard';

import Grid from '@mui/material/Grid';
import useBplaServer from '../hooks/bplaServer.hook';

export default function ListCards() {
  const [bplas, setBplas] = useState([]);
  const { getBplas } = useBplaServer();

  // if (links.length === 0) {
  //   return <p className="center">Посилань поки немає</p>;
  // }

  async function getListBpla() {
    setBplas(await getBplas());
  }

  useEffect(() => {
    getListBpla();
  }, []);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        overflow: 'auto',
        height: 'calc(100vh - 12rem)',
      }}>
      {bplas.map((bpla) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={4} key={bpla._id}>
          <BplaCard title={bpla._name + ' ' + bpla.model} preview={bpla?.photos[0]}>
            {bpla.shortDescription}
          </BplaCard>
        </Grid>
      ))}
    </Grid>
  );
}
