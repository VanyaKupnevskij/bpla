import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectInput({ variants, label }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: '100%' }}>
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}>
        <MenuItem value="">
          <em>немає</em>
        </MenuItem>
        {variants.map((variant, ind) => (
          <MenuItem value={ind} key={variant}>
            {variant}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
