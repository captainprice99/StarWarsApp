import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';

const CharacterBattle = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [battleResult, setBattleResult] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const selectCharacter = (character) => {
    if (selectedCharacters.length < 2 && !selectedCharacters.includes(character)) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const battle = () => {
    if (selectedCharacters.length !== 2) return;

    const [char1, char2] = selectedCharacters;
    const power1 = parseInt(char1.mass) || 0;
    const power2 = parseInt(char2.mass) || 0;

    if (power1 > power2) {
      setBattleResult(`${char1.name} wins!`);
    } else if (power2 > power1) {
      setBattleResult(`${char2.name} wins!`);
    } else {
      setBattleResult("It's a tie!");
    }
  };

  const resetBattle = () => {
    setSelectedCharacters([]);
    setBattleResult(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Character Battle Arena
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Characters
            </Typography>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {characters.map((character) => (
                <Button
                  key={character.name}
                  variant={selectedCharacters.includes(character) ? 'contained' : 'outlined'}
                  onClick={() => selectCharacter(character)}
                  disabled={selectedCharacters.length === 2 && !selectedCharacters.includes(character)}
                  sx={{ m: 1 }}
                >
                  {character.name}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Selected Characters
            </Typography>
            {selectedCharacters.map((character) => (
              <Box key={character.name} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{character.name}</Typography>
                <Typography variant="body2">Mass: {character.mass}</Typography>
              </Box>
            ))}
            {selectedCharacters.length === 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={battle}
                sx={{ mt: 2 }}
              >
                Battle!
              </Button>
            )}
            {battleResult && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" color="primary">
                  {battleResult}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetBattle}
                  sx={{ mt: 2 }}
                >
                  Reset Battle
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterBattle; 