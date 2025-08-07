import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '~/modules/home/Home';

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  console.log = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main title and subtitle', () => {
    render(<Home />);

    expect(
      screen.getByText('Discover Studio Ghibli Films'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a film & hover to learn more'),
    ).toBeInTheDocument();
  });

  it('renders all four film cards', () => {
    render(<Home />);

    expect(screen.getByText('Porco Rosso')).toBeInTheDocument();
    expect(screen.getByText("Kiki's Delivery Service")).toBeInTheDocument();
    expect(screen.getByText("Howl's Moving Castle")).toBeInTheDocument();
    expect(screen.getByText('My Neighbor Totoro')).toBeInTheDocument();
  });

  it('handles film card click and shows loading state', async () => {
    render(<Home />);

    const porcoRossoCard = screen
      .getByText('Porco Rosso')
      .closest('.MuiCard-root');
    expect(porcoRossoCard).toBeInTheDocument();

    // Click the card
    fireEvent.click(porcoRossoCard!);

    // Check that console.log was called with the film ID
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    );

    // Wait for the loading state to complete
    await waitFor(
      () => {
        expect(console.log).toHaveBeenCalledWith(
          'Film ebbb6b7c-945c-41ee-a792-de0e43191bd8 data fetched successfully',
        );
      },
      { timeout: 2000 },
    );
  });

  it('handles multiple film card clicks independently', async () => {
    render(<Home />);

    const porcoRossoCard = screen
      .getByText('Porco Rosso')
      .closest('.MuiCard-root');
    const totoroCard = screen
      .getByText('My Neighbor Totoro')
      .closest('.MuiCard-root');

    // Click both cards
    fireEvent.click(porcoRossoCard!);
    fireEvent.click(totoroCard!);

    // Both should be logged
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    );
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: 58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    );

    // Wait for both to complete
    await waitFor(
      () => {
        expect(console.log).toHaveBeenCalledWith(
          'Film ebbb6b7c-945c-41ee-a792-de0e43191bd8 data fetched successfully',
        );
        expect(console.log).toHaveBeenCalledWith(
          'Film 58611129-2dbc-4a81-a72f-77ddfc1b1b49 data fetched successfully',
        );
      },
      { timeout: 2000 },
    );
  });

  it('applies loading state opacity to clicked cards', async () => {
    render(<Home />);

    const porcoRossoCard = screen
      .getByText('Porco Rosso')
      .closest('.MuiCard-root');

    // Before click, card should have normal opacity
    expect(porcoRossoCard).toHaveStyle({ opacity: '1' });

    // Click the card
    fireEvent.click(porcoRossoCard!);

    // During loading, card should have reduced opacity
    expect(porcoRossoCard).toHaveStyle({ opacity: '0.7' });

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(porcoRossoCard).toHaveStyle({ opacity: '1' });
      },
      { timeout: 2000 },
    );
  });

  it('has clickable film cards', () => {
    render(<Home />);

    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards).toHaveLength(4);

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
      expect(card).toHaveStyle({ cursor: 'pointer' });
    });
  });

  it('renders with proper styling classes', () => {
    render(<Home />);

    // Check that the styled components are rendered
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(4);

    // Check that cards have proper styling
    cards.forEach((card) => {
      expect(card).toHaveClass('MuiCard-root');
    });
  });
});
