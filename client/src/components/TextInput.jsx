import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/formContext';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { QueryContext } from '../context/queryContext';

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
}) {
  const { states } = useContext(FormContext);
  const [value, setValue] = useState(states.current[name]);
  const { setItemQuery } = useContext(QueryContext);

  function handleBlur() {
    setItemQuery(name, value, true, true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    states.current[name] = value;
  }, [value]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        id={id}
        required={required}
        label={label}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
        variant="standard"
      />
    </Grid>
  );
}
