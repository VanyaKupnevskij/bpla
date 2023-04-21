import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
      {listParameters.map((item, index) => {
        switch (item.type) {
          //   case 'TextInput':
          //     return (
          //       <TextInput
          //         key={item.name}
          //         sm={index <= 1 ? 6 : 12}
          //         required={item.required}
          //         id={item.name}
          //         name={item.name}
          //         label={item.label}
          //         placeholder={item.placeholder}
          //         multiline={item.isMultiline}
          //       />
          //     );

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
                  <item.icon sx={{ mr: 1.5 }} />
                  <Typography>{item.title}</Typography>
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
      {/* <Accordion>
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
      </Accordion>*/}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Дістанція польоту</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DoubleSlider />
        </AccordionDetails>
      </Accordion> */}
    </>
  );
}
