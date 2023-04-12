import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Sort() {
  const [sort, setSort] = React.useState('name');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортування</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Сортування"
        onChange={handleChange}>
        <MenuItem value={'name'}>Назва</MenuItem>
        <MenuItem value={'popular'}>Популярність</MenuItem>
        <MenuItem value={'weight'}>Вага</MenuItem>
      </Select>
    </FormControl>
  );
}
