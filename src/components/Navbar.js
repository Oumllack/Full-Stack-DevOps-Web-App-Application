import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const MotionAppBar = motion(AppBar);

const Navbar = () => {
  return (
    <MotionAppBar
      position="static"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <HowToVoteIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
              }}
            >
              VoteApp
            </Typography>
          </Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/create"
            sx={{ mr: 2 }}
          >
            Créer un sondage
          </Button>
        </Toolbar>
      </Container>
    </MotionAppBar>
  );
};

export default Navbar; 