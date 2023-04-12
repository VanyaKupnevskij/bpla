import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DoubleSlider from './DoubleSlider';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export default function Filters({ isDrawer = false, isAside = true, handleClickClose }) {
  return (
    <>
      {isAside && (
        <Box
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: 'calc(100vh - 12rem)',
            width: '35rem',
            flexGrow: 1,
            pl: 1,
            pr: 1,
            display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' },
          }}>
          <BodyFilters />
        </Box>
      )}
      {isDrawer && (
        <ClickAwayListener onClickAway={handleClickClose}>
          <Drawer
            variant="permanent"
            sx={{
              position: 'fixed',
              zIndex: '1500',
              width: 280,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 280, boxSizing: 'border-box' },
            }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 'auto' }}
                onClick={handleClickClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, p: 1 }}>
              <BodyFilters />
            </Box>
          </Drawer>
        </ClickAwayListener>
      )}
    </>
  );
}

function BodyFilters() {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Призначення</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Розвідувальний" />
            <FormControlLabel disabled control={<Checkbox />} label="Космічний" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Вага</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="300 кг" />
            <FormControlLabel control={<Checkbox />} label="10 тон" />
            <FormControlLabel control={<Checkbox />} label="20 тон" />
            <FormControlLabel control={<Checkbox />} label="40+ тон" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Дістанція польоту</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl
              sx={{ width: '7rem', display: 'inline-block' }}
              variant="outlined"
              size="small">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">км</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'км',
                }}
              />
              <FormHelperText id="outlined-weight-helper-text">Від</FormHelperText>
            </FormControl>

            <Typography sx={{ pb: 3 }}>-</Typography>
            <FormControl
              sx={{ width: '7rem', display: 'inline-block' }}
              variant="outlined"
              size="small">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">км</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'км',
                }}
              />
              <FormHelperText id="outlined-weight-helper-text">До</FormHelperText>
            </FormControl>
          </Box>

          <DoubleSlider />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header">
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </>
  );
}
