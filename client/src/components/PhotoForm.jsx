import Typography from '@mui/material/Typography';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import UploadImages from './upload-images.component';

export default function PhotoForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Фото БПЛА
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <UploadImages />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
