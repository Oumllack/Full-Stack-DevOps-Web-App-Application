import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const MotionPaper = motion(Paper);

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Veuillez entrer un titre pour le sondage');
      return;
    }
    if (options.some(option => !option.trim())) {
      alert('Veuillez remplir toutes les options');
      return;
    }

    try {
      console.log('Envoi des données:', { title, options: options.filter(option => option.trim()) });
      const response = await axios.post('http://localhost:3000/api/polls', {
        title,
        options: options.filter(option => option.trim()),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000, // 5 secondes de timeout
      });
      console.log('Réponse du serveur:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (error.code === 'ECONNABORTED') {
        alert('Le serveur met trop de temps à répondre. Veuillez réessayer.');
      } else if (!error.response) {
        alert('Impossible de se connecter au serveur. Vérifiez que le backend est bien démarré.');
      } else {
        alert(`Erreur lors de la création du sondage: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Créer un nouveau sondage
        </Typography>

        <TextField
          fullWidth
          label="Titre du sondage"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Options
        </Typography>

        <List>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemText>
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </ListItemText>
              <ListItemSecondaryAction>
                {options.length > 2 && (
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2, mb: 3 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddOption}
            variant="outlined"
          >
            Ajouter une option
          </Button>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Créer le sondage
        </Button>
      </MotionPaper>
    </Container>
  );
};

export default CreatePoll; 