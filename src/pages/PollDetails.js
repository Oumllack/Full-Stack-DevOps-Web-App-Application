import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const MotionPaper = motion(Paper);

const PollDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/polls/${id}`);
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = async (optionIndex) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/polls/${id}/vote`, {
        optionIndex,
      });
      setPoll(response.data);
      setVoted(true);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Erreur lors du vote');
    }
  };

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

  if (!poll) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Sondage non trouvé
        </Typography>
      </Container>
    );
  }

  const totalVotes = Object.values(poll.votes || {}).reduce((a, b) => a + b, 0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ p: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {poll.title}
        </Typography>

        <Box sx={{ mt: 4 }}>
          {poll.options.map((option, index) => {
            const votes = poll.votes?.[index] || 0;
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{option}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {votes} votes ({percentage.toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                {!voted && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleVote(index)}
                    sx={{ mt: 1 }}
                  >
                    Voter
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Total des votes : {totalVotes}
        </Typography>
      </MotionPaper>
    </Container>
  );
};

export default PollDetails; 