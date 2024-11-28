import { getAllByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import SearchBar from './searchBar';

// Mock localStorage before any tests run
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeAll(() => {
  // Mock window.history.state before tests run
  Object.defineProperty(window.history, 'state', {
    value: { idx: 0 }, // Set idx to a default value
    writable: true,
  });
});


  // Check if "On Streamify" is on the screen
  //const streamifyElement = getByText(/On Streamify/i); // Use regex for case-insensitive match
 // expect(streamifyElement).toBeInTheDocument(); // Assert that the element is in the document

test('renders On Streamify', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/HELLO/i)).toBeInTheDocument
  expect(screen.getByText(/On Streamify/i)).toBeInTheDocument();
  expect(screen.getByText(/Explore captivating shows and series, handpicked for you. From drama to comedy, sci-fi to romance, we've got it all. Start Watching now!/i)).toBeInTheDocument();
});