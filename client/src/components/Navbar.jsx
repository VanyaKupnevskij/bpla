import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Button, Container, InputBase, Paper, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ModeSwitch from './ModeSwitch';
import FormGroup from '@mui/material/FormGroup';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

import logoImage from '../images/logo.png';
import { QueryContext } from '../context/queryContext';
import { AuthContext } from '../context/context';

export default function Navbar({ displaySearch = true, displayLogout = false }) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { submit, setItemQuery, filteredQueries } = useContext(QueryContext);

  function handleReadyQuery() {
    setSearchValue(filteredQueries.current.text_str ?? '');
  }

  useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  function handleClickSearch() {
    navigate('/');
    setItemQuery('text', searchValue, true, true);
    submit();
  }

  function handleChangeSearch(event) {
    setSearchValue(event.target.value);
  }

  function handleClickClear() {
    setSearchValue('');
    setItemQuery('text', '', true, true);
    submit();
  }

  function handleKeyPress(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      handleClickSearch();
    }
  }

  function handleClickHome() {
    navigate('/');
  }

  function handleClickLogout() {
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              onClick={handleClickHome}
              sx={{ mr: '1rem', display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}>
              <img src={logoImage} alt="logo" style={{ height: '3rem' }} />
            </Box>
            <Typography
              onClick={handleClickHome}
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: '3rem', display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}>
              БПЛА
            </Typography>

            {displaySearch && (
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
                {searchValue.length > 0 && (
                  <IconButton
                    onClick={handleClickClear}
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search">
                    <CloseIcon />
                  </IconButton>
                )}
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={searchValue}
                  onChange={handleChangeSearch}
                  onKeyDown={handleKeyPress}
                  placeholder="Пошук БПЛА..."
                  inputProps={{ 'aria-label': 'search bpla' }}
                />
                <Tooltip TransitionComponent={Zoom} title="Search">
                  <IconButton
                    onClick={handleClickSearch}
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </Paper>
            )}

            <FormGroup
              sx={{
                pl: { xs: 2, sm: 3, md: 5 },
                ml: 'auto',
                display: { xs: 'none', sm: 'block' },
              }}>
              <ModeSwitch />
            </FormGroup>
            {displayLogout && (
              <Button
                onClick={handleClickLogout}
                color="secondary"
                type="button"
                sx={{ p: '10px', ml: '1.5rem' }}
                aria-label="search">
                <Typography variant="button">log out</Typography>
                <LogoutIcon sx={{ ml: '0.5rem' }} />
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
