import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoubleSlider from './DoubleSlider';

import listParameters from '../context/listParameters';
import TextInput from './TextInput';

export default function BodyFilters() {
  return (
    <>
      <Button variant="contained" fullWidth>
        Застосувати фільтри
      </Button>
      {listParameters.map((item, index) => {
        switch (item.type) {
          case 'TextInput':
            if (!item.isFilter) return null;

            return (
              <Box my={2} key={item.name}>
                <Typography variant="body1">Пошук за: {item.label.toLowerCase()}</Typography>
                <TextInput
                  sm={12}
                  required={item.required}
                  id={item.name}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  multiline={item.isMultiline}
                />
              </Box>
            );

          case 'MultipleSelect':
          case 'SelectInput':
            return (
              <Accordion key={item.name}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item.name}>
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.variants.map((variant, ind) => (
                    <FormGroup key={ind}>
                      <FormControlLabel control={<Checkbox checked />} label={variant} />
                    </FormGroup>
                  ))}
                </AccordionDetails>
              </Accordion>
            );

          case 'NumberSlider':
            return (
              <Accordion key={item.name}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item.name}>
                  <item.icon />
                  <Typography sx={{ ml: 1.5 }}>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DoubleSlider
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    countMarkBase={item.countMarkBase}
                  />
                </AccordionDetails>
              </Accordion>
            );
        }
      })}
    </>
  );
}
