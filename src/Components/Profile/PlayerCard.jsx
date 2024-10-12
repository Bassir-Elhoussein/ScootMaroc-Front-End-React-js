import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
// Sample player data
const player = {
    fullName: 'John Doe',
    location: 'New York, USA',
    weight: '75 kg',
    image: 'https://example.com/player-image.jpg', // Replace with actual image URL
  };
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  minHeight: 200,
  borderRadius: '15px',
  perspective: '1000px',
  transition: 'transform 0.8s ease-in-out',
  position: 'relative',
  '&.flip': {
    transform: 'rotateY(360deg)',
  },
}));

const StyledCardInner = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.8s ease-in-out',
  transformStyle: 'preserve-3d',
  transform: 'rotateY(0deg)',
  '&.flip': {
    transform: 'rotateY(360deg)',
  },
});

const StyledCardFront = styled(CardContent)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledCardBack = styled(CardContent)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: '0 auto',
  border: `2px solid ${theme.palette.primary.main}`,
}));

const PlayerCard = ({ player }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(true);
    setTimeout(() => setFlipped(false), 1600); // Reset flip after animation
  };

  return (
    <Box>
      <Button onClick={handleFlip} variant="contained" color="primary" style={{ marginBottom: '16px' }}>
        Show Player
      </Button>
      <StyledCard className={flipped ? 'flip' : ''}>
        <StyledCardInner className={flipped ? 'flip' : ''}>
          <StyledCardFront>
            <StyledAvatar src={player.image} alt={player.fullName} />
            <Typography variant="h5" component="div" align="center" gutterBottom>
              {player.fullName}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Location: {player.location}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Weight: {player.weight}
            </Typography>
          </StyledCardFront>
          <StyledCardBack>
            {/* Add additional content here if needed */}
            <Typography variant="h6" align="center">
              Additional Details
            </Typography>
          </StyledCardBack>
        </StyledCardInner>
      </StyledCard>
    </Box>
  );
};

export default PlayerCard;
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<PlayerCard  player={player} />
</div>