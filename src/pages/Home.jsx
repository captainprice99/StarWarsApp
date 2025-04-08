import { Box, Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Star Wars Universe
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Explore the vast galaxy of Star Wars characters, their stories, and the rich lore of the universe.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card component={RouterLink} to="/characters" sx={{ textDecoration: 'none', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="/images/characters.jpg"
              alt="Star Wars Characters"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Characters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover the heroes, villains, and everything in between from across the Star Wars galaxy.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="/images/timeline.jpg"
              alt="Star Wars Timeline"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Timeline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore the rich history of the Star Wars universe through different eras and events.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="/images/lore.jpg"
              alt="Star Wars Lore"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lore
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dive deep into the mythology, cultures, and technologies that make up the Star Wars universe.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 