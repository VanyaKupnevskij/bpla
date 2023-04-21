import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ListCards from '../components/ListCards';
import Filters from '../components/Filters';
import { useState } from 'react';
import Sort from '../components/Sort';
import Paginator from '../components/Paginator';

export default function MainPage() {
  const [openFilters, setOpenFilters] = useState(false);

  const handleClickFilters = () => {
    setOpenFilters((prev) => (prev = !prev));
  };

  const handleClickClose = () => {
    setOpenFilters(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', p: 3, gap: 1 }}>
        <Button
          variant="contained"
          color="info"
          onClick={handleClickFilters}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' },
          }}>
          Фільтри
        </Button>
        <Box sx={{ width: { xs: 'auto', sm: 200 }, ml: 'auto', flexGrow: { xs: 1, sm: 0 } }}>
          <Sort />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Filters isDrawer={openFilters} handleClickClose={handleClickClose} />
        <Box component="main" sx={{ flexGrow: 1, flexShrink: 2, p: 3, pt: 0 }}>
          <ListCards
            sx={{
              overflow: 'auto',
              height: 'calc(100vh - 15.5rem)',
            }}
          />
          <Paginator />
        </Box>
      </Box>
    </Box>
  );
}
