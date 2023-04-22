import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useContext, useState } from 'react';
import { QueryContext } from '../context/queryContext';

export default function ListCheckboxes({ name, listData = [] }) {
  const [listChecked, setListChecked] = useState(new Array(listData.length).fill(false));
  const { setItemQuery } = useContext(QueryContext);

  function handleChange(id) {
    let newList = [...listChecked];
    newList[id] = !newList[id];
    setListChecked(newList);

    setItemQuery(name, listData[id], newList[id]);
  }

  return (
    <FormGroup>
      {listData.map((data, ind) => (
        <FormControlLabel
          key={ind}
          control={<Checkbox checked={listChecked[ind]} />}
          onChange={() => handleChange(ind)}
          label={data}
        />
      ))}
    </FormGroup>
  );
}
