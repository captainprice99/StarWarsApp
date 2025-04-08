import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Input
} from '@mui/material';
import axios from 'axios';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    affiliation: '',
    era: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      await axios.post('http://localhost:5000/api/characters', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/characters');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating character');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Character
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Character Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Affiliation</InputLabel>
            <Select
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              required
            >
              <MenuItem value="Jedi">Jedi</MenuItem>
              <MenuItem value="Sith">Sith</MenuItem>
              <MenuItem value="Rebel Alliance">Rebel Alliance</MenuItem>
              <MenuItem value="Galactic Empire">Galactic Empire</MenuItem>
              <MenuItem value="Neutral">Neutral</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Era</InputLabel>
            <Select
              name="era"
              value={formData.era}
              onChange={handleChange}
              required
            >
              <MenuItem value="Old Republic">Old Republic</MenuItem>
              <MenuItem value="Clone Wars">Clone Wars</MenuItem>
              <MenuItem value="Galactic Civil War">Galactic Civil War</MenuItem>
              <MenuItem value="First Order">First Order</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" display="block" gutterBottom>
              Upload a character image (optional)
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Create Character
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/characters')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCharacter; 