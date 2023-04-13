import BplaCard from './BplaCard';

import Grid from '@mui/material/Grid';

export default function ListCards() {
  // if (links.length === 0) {
  //   return <p className="center">Посилань поки немає</p>;
  // }

  return (
    <Grid
      container
      spacing={1}
      sx={{
        overflow: 'auto',
        height: 'calc(100vh - 12rem)',
      }}>
      {Array.from(Array(8)).map((_, ind) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={4} key={ind}>
          <BplaCard>Title {ind}</BplaCard>
        </Grid>
      ))}
    </Grid>
  );
}
