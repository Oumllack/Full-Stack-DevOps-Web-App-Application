import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const MotionCard = motion(Card);

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/polls');
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sondages Actifs
      </Typography>
      <Grid container spacing={3}>
        {polls.map((poll, index) => (
          <Grid item xs={12} sm={6} md={4} key={poll.id}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {poll.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {poll.options.length} options
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/poll/${poll.id}`}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Voir le sondage
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 