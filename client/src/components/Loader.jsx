import { CircularProgress, Container } from '@mui/material';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    </div>
  );
}
