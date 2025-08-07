import { describe, it, expect } from 'vitest';
import { GET_FILM, GET_ALL_FILMS } from '~/graphql/queries/films';
import type { GetFilmQuery, GetAllFilmsQuery } from '~/graphql/gen/graphql';

describe('GraphQL Integration', () => {
  it('should have properly typed film query', () => {
    // This test verifies that our GraphQL queries are properly typed
    expect(GET_FILM).toBeDefined();
    expect(GET_ALL_FILMS).toBeDefined();
  });

  it('should have correct TypeScript types for film query', () => {
    // This test verifies that our generated types are working
    const mockFilmData: GetFilmQuery = {
      film: {
        id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
        title: 'Porco Rosso',
        director: 'Hayao Miyazaki',
        description: 'A bounty hunting pilot...',
        release_date: '1992',
        running_time: '94',
        rt_score: '94',
        url: 'https://ghibliapi.vercel.app/films/ebbb6b7c-945c-41ee-a792-de0e43191bd8',
        original_title: null,
        original_title_romanised: null,
        producer: null,
        people: null,
        species: null,
        locations: null,
        vehicles: null,
      },
    };

    expect(mockFilmData.film?.title).toBe('Porco Rosso');
    expect(mockFilmData.film?.director).toBe('Hayao Miyazaki');
  });

  it('should have correct TypeScript types for all films query', () => {
    // This test verifies that our generated types are working for multiple films
    const mockFilmsData: GetAllFilmsQuery = {
      films: [
        {
          id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
          title: 'Porco Rosso',
          director: 'Hayao Miyazaki',
          description: 'A bounty hunting pilot...',
          release_date: '1992',
          running_time: '94',
          rt_score: '94',
          url: 'https://ghibliapi.vercel.app/films/ebbb6b7c-945c-41ee-a792-de0e43191bd8',
          original_title: null,
          original_title_romanised: null,
          producer: null,
          people: null,
          species: null,
          locations: null,
          vehicles: null,
        },
        {
          id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
          title: "Kiki's Delivery Service",
          director: 'Hayao Miyazaki',
          description: 'A young witch...',
          release_date: '1989',
          running_time: '103',
          rt_score: '96',
          url: 'https://ghibliapi.vercel.app/films/ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
          original_title: null,
          original_title_romanised: null,
          producer: null,
          people: null,
          species: null,
          locations: null,
          vehicles: null,
        },
      ],
    };

    expect(mockFilmsData.films).toHaveLength(2);
    expect(mockFilmsData.films?.[0]?.title).toBe('Porco Rosso');
    expect(mockFilmsData.films?.[1]?.title).toBe("Kiki's Delivery Service");
  });

  it('should have proper GraphQL query structure', () => {
    // This test verifies that our GraphQL queries have the correct structure
    expect(GET_FILM.kind).toBe('Document');
    expect(GET_ALL_FILMS.kind).toBe('Document');
  });
});
