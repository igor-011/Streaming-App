// src/setupTests.js

const localStorageMock = (function () {
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
  module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    // other configurations...
  };