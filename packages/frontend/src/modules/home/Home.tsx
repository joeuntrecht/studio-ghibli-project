import { useState } from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import { FilmCard } from '~/shared/components/FilmCard';
import { useGetFilm } from '~/graphql/hooks';

// Film colors mapping for the design
const FILM_COLORS = {
  'ebbb6b7c-945c-41ee-a792-de0e43191bd8': '#FF6B35', // Porco Rosso - Orange/red
  'ea660b10-85c4-4ae3-8a5f-41cea3648e3e': '#FF8E53', // Kiki's Delivery Service - Light orange
  'cd3d059c-09f4-4ff3-8d63-bc765a5184fa': '#4A90E2', // Howl's Moving Castle - Blue
  '58611129-2dbc-4a81-a72f-77ddfc1b1b49': '#8BC34A', // My Neighbor Totoro - Green
};

// Initial film buttons data
const INITIAL_FILMS = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    color: '#FF6B35',
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: "Kiki's Delivery Service",
    color: '#FF8E53',
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    title: "Howl's Moving Castle",
    color: '#4A90E2',
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    color: '#8BC34A',
  },
];

// Styled components to match the Zeplin design
const SkyBackground = styled(Box)({
  background: 'url("/assets/cloud_background.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  position: 'relative',
});

const FilmButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  background: color,
  color: 'white',
  borderRadius: '16px',
  border: '2px solid white',
  padding: '24px',
  fontSize: '0.95rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  height: '300px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '&:hover': {
    background: color,
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    background: '#ccc',
    color: '#666',
  },
}));

const ArrowIcon = styled(Box)({
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
  const [fetchedFilms, setFetchedFilms] = useState<Record<string, any>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );

  const handleFilmClick = async (filmId: string) => {
    setLoadingStates((prev) => ({ ...prev, [filmId]: true }));

    try {
      console.log(`Fetching film with ID: ${filmId}`);

      // Make actual GraphQL call to backend
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetFilm($id: String!) {
              film(id: $id) {
                id
                title
                original_title
                original_title_romanised
                image
                movie_banner
                description
                director
                producer
                release_date
                running_time
                rt_score
                people
                species
                locations
                vehicles
                url
              }
            }
          `,
          variables: {
            id: filmId,
          },
        }),
      });

      const result = await response.json();
      console.log('GraphQL Response:', JSON.stringify(result, null, 2));

      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error('GraphQL query failed');
      }

      if (result.data?.film) {
        const filmData = {
          ...result.data.film,
          color: INITIAL_FILMS.find((f) => f.id === filmId)?.color || '#666',
          // Use the actual image URL from the API response
          image:
            result.data.film.image ||
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center',
        };

        console.log('Image URL from API:', result.data.film.image);
        console.log('Processed film data:', JSON.stringify(filmData, null, 2));
        setFetchedFilms((prev) => ({ ...prev, [filmId]: filmData }));
      } else {
        console.error('No film data in response');
        throw new Error('No film data received');
      }
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
          padding={{ xs: '24px 8px', sm: '32px 16px', md: '48px 32px' }}
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
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
              wordBreak: 'break-word',
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

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            sx={{
              width: '100%',
              margin: '0 auto',
              px: { xs: 1, sm: 2, md: 0 },
              maxWidth: '100%',
            }}
          >
            {INITIAL_FILMS.map((film) => {
              const fetchedFilm = fetchedFilms[film.id];
              const isLoading = loadingStates[film.id] || false;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={film.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {fetchedFilm ? (
                    // Show card if film has been fetched
                    <FilmCard
                      film={fetchedFilm}
                      onClick={() => handleFilmClick(film.id)}
                      loading={isLoading}
                    />
                  ) : (
                    // Show button if film hasn't been fetched yet
                    <FilmButton
                      color={film.color}
                      onClick={() => handleFilmClick(film.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : film.title}
                      {!isLoading && <ArrowIcon />}
                    </FilmButton>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </SkyBackground>
  );
};

export default Home;
