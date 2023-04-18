import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import listParameters from '../context/listParameters';

export default function ListParameters({ datas }) {
  return (
    <List disablePadding>
      {listParameters.map((parameter, index) => {
        const backColor = index & 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(10, 10, 10, 0.05)';
        let value = '---';
        if (parameter.type === 'MultipleSelect') {
          if (datas[parameter.name].length !== 0) {
            value = datas[parameter.name].map((item) => <div key={item}>{item}</div>);
          }
        } else {
          value = datas[parameter.name] || '---';
        }

        return (
          <ListItem key={parameter.name} sx={{ py: 1, px: 1, background: backColor }}>
            <ListItemText primary={parameter.label ?? parameter.title} />
            <Typography variant="body2" sx={{ maxWidth: '70%' }}>
              {value}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
}
