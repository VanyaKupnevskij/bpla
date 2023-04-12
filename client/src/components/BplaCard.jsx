import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import img from '../images/bpla_img1.jpg';

export default function BplaCard({ link, children }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="140" image={img} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {children}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button size="small" color="primary">
          Детальніше
        </Button>
      </CardActions>
    </Card>
  );
}
