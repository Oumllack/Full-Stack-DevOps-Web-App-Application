import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';

const AddItemForm = ({ onAddItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddItem(title, description);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : '60px' }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        {!isExpanded ? (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsExpanded(true)}
            sx={{
              height: '40px',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(33, 150, 243, 0.04)',
              },
            }}
          >
            Ajouter un nouvel élément
          </Button>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Nouvel élément
            </Typography>
            <TextField
              label="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => setIsExpanded(false)}
                sx={{
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(33, 150, 243, 0.04)',
                  },
                }}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1CB5E0 90%)',
                  },
                }}
              >
                Ajouter
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default AddItemForm; 