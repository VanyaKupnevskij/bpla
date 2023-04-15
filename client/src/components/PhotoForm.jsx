import Typography from '@mui/material/Typography';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import UploadImages from './upload-images.component';

export default function PhotoForm({ triggerChange, handleSave }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Фото БПЛА
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UploadImages triggerChange={triggerChange} handleSave={handleSave} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
