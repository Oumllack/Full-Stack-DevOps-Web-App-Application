import { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleVote = async (itemId, voteType) => {
    try {
      await axios.post('http://localhost:3000/api/vote', { itemId, voteType });
      fetchItems();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleAddItem = async (title, description) => {
    try {
      await axios.post('http://localhost:3000/api/items', { title, description });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                align="center"
                sx={{
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4,
                }}
              >
                Système de Vote
              </Typography>
              <AddItemForm onAddItem={handleAddItem} />
            </Paper>
            <AnimatePresence>
              {!loading && <ItemList items={items} onVote={handleVote} />}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
