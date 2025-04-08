import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { io } from 'socket.io-client';

const CharacterBattle = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [battleStatus, setBattleStatus] = useState('idle');
  const [battleResult, setBattleResult] = useState(null);
  const [spectators, setSpectators] = useState(0);

  useEffect(() => {
    fetchCharacters();
    const socket = io('http://localhost:3001');

    socket.on('battle_start', (data) => {
      setBattleStatus('fighting');
      setSpectators(data.spectators);
    });

    socket.on('battle_end', (data) => {
      setBattleStatus('finished');
      setBattleResult(data.winner);
      setSpectators(data.spectators);
    });

    socket.on('spectator_update', (count) => {
      setSpectators(count);
    });

    return () => {
      socket.disconnect();
    };
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

  const startBattle = () => {
    if (selectedCharacters.length === 2) {
      const socket = io('http://localhost:3001');
      socket.emit('start_battle', {
        characters: selectedCharacters,
      });
    }
  };

  const resetBattle = () => {
    setSelectedCharacters([]);
    setBattleStatus('idle');
    setBattleResult(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Character Battle Arena
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Spectators: {spectators}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {selectedCharacters.map((character, index) => (
                <Grid item xs={6} key={character.name}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/').slice(-2, -1)}.jpg`}
                      alt={character.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{character.name}</Typography>
                      <Typography variant="body2">Height: {character.height}</Typography>
                      <Typography variant="body2">Mass: {character.mass}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
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
            {selectedCharacters.length === 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={startBattle}
                disabled={battleStatus === 'fighting'}
                fullWidth
                sx={{ mt: 2 }}
              >
                {battleStatus === 'fighting' ? 'Battle in Progress...' : 'Start Battle'}
              </Button>
            )}
            {battleResult && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" color="primary">
                  Winner: {battleResult.name}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetBattle}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  New Battle
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