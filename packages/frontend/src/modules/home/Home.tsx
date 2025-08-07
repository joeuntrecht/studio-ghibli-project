import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Film data from the PRD with colors matching the design
const FILMS = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    color: '#FF6B35', // Orange/red color
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: "Kiki's Delivery Service",
    color: '#FF8E53', // Light orange
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    title: "Howl's Moving Castle",
    color: '#4A90E2', // Blue color
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    color: '#8BC34A', // Green color
  },
];

// Styled components to match the Zeplin design
const SkyBackground = styled(Box)({
  background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 100%)',
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="20" cy="20" r="3" fill="white" opacity="0.8"/%3E%3Ccircle cx="80" cy="40" r="2" fill="white" opacity="0.6"/%3E%3Ccircle cx="40" cy="80" r="2.5" fill="white" opacity="0.7"/%3E%3C/svg%3E")',
    backgroundSize: '200px 200px',
    opacity: 0.3,
  },
});

const FilmCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  border: '2px solid white',
  background: 'white',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
  },
}));

const FilmCardContent = styled(CardContent)({
  padding: '24px',
  textAlign: 'center',
  position: 'relative',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const FilmTitle = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  fontSize: '1.2rem',
  textAlign: 'center',
  marginBottom: '16px',
});

const ArrowButton = styled(Box)({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&::after': {
    content: '""',
    width: '0',
    height: '0',
    borderLeft: '6px solid #333',
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
  },
});

const Home = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );

  const handleFilmClick = async (filmId: string) => {
    setLoadingStates((prev) => ({ ...prev, [filmId]: true }));

    try {
      console.log(`Fetching film with ID: ${filmId}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Film ${filmId} data fetched successfully`);
    } catch (error) {
      console.error(`Error fetching film ${filmId}:`, error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [filmId]: false }));
    }
  };

  return (
    <SkyBackground>
      <Container maxWidth="lg">
        <Box
          padding="32px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          position="relative"
          zIndex={1}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{
              mb: 4,
              color: '#333',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Discover Studio Ghibli Films
          </Typography>

          <Typography
            variant="body1"
            color="#666"
            textAlign="center"
            sx={{
              mb: 6,
              fontSize: '1.1rem',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Select a film & hover to learn more
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {FILMS.map((film) => (
              <Grid item xs={12} sm={6} md={3} key={film.id}>
                <FilmCard
                  onClick={() => handleFilmClick(film.id)}
                  sx={{
                    background: film.color,
                    opacity: loadingStates[film.id] ? 0.7 : 1,
                  }}
                >
                  <FilmCardContent>
                    <FilmTitle variant="h6">{film.title}</FilmTitle>
                    <ArrowButton />
                  </FilmCardContent>
                </FilmCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </SkyBackground>
  );
};

export default Home;
