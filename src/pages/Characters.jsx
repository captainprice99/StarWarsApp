import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Tabs,
  Tab,
  Pagination
} from '@mui/material';
import axios from 'axios';

const Characters = () => {
  const [swapiCharacters, setSwapiCharacters] = useState([]);
  const [customCharacters, setCustomCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 0) {
      fetchSwapiCharacters();
    } else {
      fetchCustomCharacters();
    }
  }, [page, searchTerm, activeTab]);

  const fetchSwapiCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}&search=${searchTerm}`);
      const charactersWithIds = response.data.results.map((character, index) => {
        // Extract the ID from the character's URL
        const characterId = character.url.split('/').slice(-2, -1)[0];
        return {
          ...character,
          _id: characterId,
          imageUrl: `https://raw.githubusercontent.com/akabab/starwars-api/master/assets/images/characters/${characterId}.jpg`,
          type: 'swapi'
        };
      });
      setSwapiCharacters(charactersWithIds);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error('Error fetching SWAPI characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/characters', {
        params: { search: searchTerm }
      });
      setCustomCharacters(response.data.characters.map(char => ({ ...char, type: 'custom' })));
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching custom characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
    setSearchTerm('');
  };

  const characters = activeTab === 0 ? swapiCharacters : customCharacters;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Star Wars Characters
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Star Wars Universe" />
            <Tab label="Custom Characters" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Search Characters"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ mb: 2 }}
          />
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {characters.map((character) => (
                <Grid item key={character._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', cursor: 'pointer' }}
                    onClick={() => navigate(`/characters/${character._id}?type=${character.type}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={character.imageUrl}
                      alt={character.name}
                      onError={(e) => {
                        e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                      </Typography>
                      {character.type === 'swapi' ? (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            Birth Year: {character.birth_year}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Gender: {character.gender}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            Species: {character.species}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Affiliation: {character.affiliation}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {activeTab === 0 && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Characters; 