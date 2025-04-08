import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';

// 3D Character Component
const CharacterModel = ({ url, position, animation }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} />;
};

const CharacterBattle3D = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [battleStatus, setBattleStatus] = useState('idle');
  const [spectators, setSpectators] = useState(0);
  const socket = useRef();

  useEffect(() => {
    // Initialize socket connection
    socket.current = io('http://localhost:3001');

    // Socket event listeners
    socket.current.on('battle_start', (data) => {
      setBattleStatus('fighting');
      setSpectators(data.spectators);
    });

    socket.current.on('battle_end', (data) => {
      setBattleStatus('finished');
      setSpectators(data.spectators);
    });

    socket.current.on('spectator_update', (count) => {
      setSpectators(count);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const startBattle = () => {
    if (selectedCharacters.length === 2) {
      socket.current.emit('start_battle', {
        characters: selectedCharacters,
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        3D Battle Arena
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '500px' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {selectedCharacters.map((char, index) => (
                <CharacterModel
                  key={char.name}
                  url={`/models/${char.name.toLowerCase()}.glb`}
                  position={[index * 2 - 1, 0, 0]}
                />
              ))}
              <OrbitControls />
            </Canvas>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Battle Controls
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Spectators: {spectators}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={startBattle}
              disabled={selectedCharacters.length !== 2 || battleStatus === 'fighting'}
              fullWidth
              sx={{ mt: 2 }}
            >
              {battleStatus === 'fighting' ? 'Battle in Progress...' : 'Start Battle'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterBattle3D; 