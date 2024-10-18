import { getAllByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import SearchBar from './searchBar';

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

  test('should see if Streamify is on the screen', () =>{
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    </Provider>

    expect(screen.getByText(/Streamify/i)).toBeInTheDocument()
  })