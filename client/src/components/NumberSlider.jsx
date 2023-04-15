import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { useMediaQuery, useTheme } from '@mui/material';

const Input = styled(MuiInput)`
  width: 5rem;
  margin: 0 1rem 1.3rem 0;
  font-size: 1.3rem;
`;

export default function NumberSlider({ name, min = 0, max = 100, step = 10, countMarkBase = 5 }) {
  const [value, setValue] = React.useState(min);
  const [countMark, setCountMark] = React.useState(countMarkBase);
  const [marks, setMarks] = React.useState([
    {
      value: 0,
      label: '0',
    },
  ]);

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (downSm) {
      setCountMark(~~(countMarkBase / 2));
    }

    let tempMarks = [
      {
        value: 0,
        label: '0',
      },
    ];
    let mark = 0;
    const allRange = Math.abs(min) + Math.abs(max);
    const stepMark = allRange / countMark;

    for (let i = 0; i <= countMark; i++) {
      mark = min + stepMark * i;

      tempMarks.push({
        value: mark,
        label: mark,
      });
    }

    setMarks(tempMarks);
  }, [min, max, countMark]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs>
          <Slider
            name={name}
            min={min}
            max={max}
            step={step}
            marks={marks}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            sx={{ ml: 2 }}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            name={name}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
