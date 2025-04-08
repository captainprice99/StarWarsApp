import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Paper
} from '@mui/material';
import axios from 'axios';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [homeworld, setHomeworld] = useState('');
  const [films, setFilms] = useState([]);
  const characterType = new URLSearchParams(location.search).get('type');

  useEffect(() => {
    fetchCharacter();
  }, [id, characterType]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      if (characterType === 'swapi') {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const characterData = response.data;
        setCharacter(characterData);

        // Fetch homeworld
        const homeworldResponse = await axios.get(characterData.homeworld);
        setHomeworld(homeworldResponse.data.name);

        // Fetch films
        const filmsPromises = characterData.films.map(url => axios.get(url));
        const filmsResponses = await Promise.all(filmsPromises);
        setFilms(filmsResponses.map(response => response.data.title));
      } else {
        const response = await axios.get(`http://localhost:5000/api/characters/${id}`);
        setCharacter(response.data);
      }
    } catch (error) {
      console.error('Error fetching character:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!character) {
    return (
      <Container>
        <Typography>Character not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/characters')}
          sx={{ mb: 2 }}
        >
          Back to Characters
        </Button>

        <Card>
          <CardMedia
            component="img"
            height="400"
            image={characterType === 'swapi' 
              ? `https://raw.githubusercontent.com/akabab/starwars-api/master/assets/images/characters/${id}.jpg`
              : character.imageUrl || 'https://raw.githubusercontent.com/akabab/starwars-api/master/assets/images/placeholder.jpg'}
            alt={character.name}
            onError={(e) => {
              e.target.src = 'https://raw.githubusercontent.com/akabab/starwars-api/master/assets/images/placeholder.jpg';
            }}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {character.name}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {characterType === 'swapi' ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Personal Information
                      </Typography>
                      <Typography>Birth Year: {character.birth_year}</Typography>
                      <Typography>Gender: {character.gender}</Typography>
                      <Typography>Height: {character.height} cm</Typography>
                      <Typography>Mass: {character.mass} kg</Typography>
                      <Typography>Hair Color: {character.hair_color}</Typography>
                      <Typography>Eye Color: {character.eye_color}</Typography>
                      <Typography>Skin Color: {character.skin_color}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Homeworld
                      </Typography>
                      <Typography>{homeworld}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Appears in Films
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {films.map((film, index) => (
                          <Typography key={index} component="span">
                            {film}{index < films.length - 1 ? ', ' : ''}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Character Information
                      </Typography>
                      <Typography>Species: {character.species}</Typography>
                      <Typography>Affiliation: {character.affiliation}</Typography>
                      <Typography>Era: {character.era}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Description
                      </Typography>
                      <Typography>{character.description}</Typography>
                    </Paper>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CharacterDetail; 