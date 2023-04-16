import React, { useContext, useEffect } from 'react';
import { FormContext } from '../context/formContext';
import ImagesCarousel from './ImagesCarousel';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import listParameters from '../context/listParameters';

function ListParameters({ states }) {
  return (
    <List disablePadding>
      {listParameters.map((parameter, index) => {
        const backColor = index & 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(10, 10, 10, 0.05)';
        let value = '---';
        if (parameter.type === 'MultipleSelect') {
          if (states.current[parameter.name].length !== 0) {
            value = states.current[parameter.name].map((item) => <div key={item}>{item}</div>);
          }
        } else {
          value = states.current[parameter.name] || '---';
        }

        return (
          <ListItem key={parameter.name} sx={{ py: 1, px: 1, background: backColor }}>
            <ListItemText primary={parameter.label ?? parameter.title} />
            <Typography variant="overline" sx={{ maxWidth: '70%' }}>
              {value}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
}

export default function Review() {
  const { states } = useContext(FormContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Перевірте всю інформацію
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImagesCarousel images={states.current.images} />
      </div>
      <ListParameters states={states} />
    </>
  );
}
