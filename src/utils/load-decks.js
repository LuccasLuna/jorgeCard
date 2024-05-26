export const loadDecks = async () => {
  try {
    const response = await fetch('https://66526823813d78e6d6d57405.mockapi.io/decks');

    if (!response.ok) {
      throw new Error(`Failed to fetch decks: ${response.status} ${response.statusText}`);
    }

    const decksJson = await response.json();
    return decksJson;
  } catch (error) {
    console.error('Error loading decks:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}