import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import noPhoto from '../images/noPhoto.jpg';

export default function BplaCard({ title, idBpla, preview = noPhoto, children }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={'230rem'}
          image={preview}
          alt="preview"
          sx={{ objectFit: 'contain', p: 1 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
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
