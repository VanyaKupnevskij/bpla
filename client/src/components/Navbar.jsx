import React from 'react';
import logoImage from '../images/logo.png';

import Box from '@mui/material/Box';
import { Container, InputBase, Paper, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ModeSwitch from './ModeSwitch';
import FormGroup from '@mui/material/FormGroup';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Box sx={{ mr: '1rem', display: { xs: 'none', sm: 'block' } }}>
              <img src={logoImage} alt="logo" style={{ height: '3rem' }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: '3rem', display: { xs: 'none', sm: 'block' } }}>
              БПЛА
            </Typography>

            <Paper
              component="form"
              elevation={3}
              sx={{
                m: '4px',
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
              }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Пошук БПЛА..."
                inputProps={{ 'aria-label': 'search bpla' }}
              />
              <Tooltip TransitionComponent={Zoom} title="Search">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Paper>
            <FormGroup sx={{ pl: { xs: 2, sm: 3, md: 5 }, display: { xs: 'none', sm: 'block' } }}>
              <ModeSwitch />
            </FormGroup>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
