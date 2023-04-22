import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

export default function ListCheckboxes({ listData = [] }) {
  const [listChecked, setListChecked] = useState(new Array(listData.length).fill(true));

  function handlerChange(id) {
    let newList = [...listChecked];
    newList[id] = !newList[id];
    setListChecked(newList);
  }

  return (
    <FormGroup>
      {listData.map((data, ind) => (
        <FormControlLabel
          key={ind}
          control={<Checkbox checked={listChecked[ind]} />}
          onChange={() => handlerChange(ind)}
          label={data}
        />
      ))}
    </FormGroup>
  );
}
