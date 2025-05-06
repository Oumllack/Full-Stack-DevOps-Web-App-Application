import { Card, CardContent, Typography, IconButton, Box, Stack, Chip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ItemList = ({ items, onVote }) => {
  return (
    <Stack spacing={3}>
      {items.map((item, index) => (
        <MotionCard
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Chip
                label={`${new Date(item.created_at).toLocaleDateString()}`}
                size="small"
                sx={{ backgroundColor: 'rgba(33, 150, 243, 0.1)' }}
              />
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                color: 'rgba(0, 0, 0, 0.7)',
              }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                p: 1,
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  color="primary"
                  onClick={() => onVote(item.id, 'like')}
                  aria-label="like"
                  sx={{
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    },
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    minWidth: '2ch',
                  }}
                >
                  {item.likes || 0}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  color="secondary"
                  onClick={() => onVote(item.id, 'dislike')}
                  aria-label="dislike"
                  sx={{
                    backgroundColor: 'rgba(245, 0, 87, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(245, 0, 87, 0.2)',
                    },
                  }}
                >
                  <ThumbDownIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'secondary.main',
                    minWidth: '2ch',
                  }}
                >
                  {item.dislikes || 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </MotionCard>
      ))}
    </Stack>
  );
};

export default ItemList; 