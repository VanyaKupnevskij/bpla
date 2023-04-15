import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSaveValueOnChange } from '../hooks/saveValueOnChange.hook';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function TextInput({
  id,
  required = false,
  multiline = false,
  label,
  name,
  placeholder,
  xs,
  sm,
  md,
  lg,
  triggerChange,
  handleSave,
}) {
  const [value, setValue] = useState(useSelector((state) => state.currentBpla[name]));

  const { isSave } = useSaveValueOnChange(value, name, triggerChange);
  useEffect(() => {
    handleSave();
  }, [isSave]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        id={id}
        required={required}
        label={label}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
        variant="standard"
      />
    </Grid>
  );
}
