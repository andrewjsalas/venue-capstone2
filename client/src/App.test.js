import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import Redux store
import App from './App';

describe('App component', () => {
  test('renders Navbar component when user is logged in', () => {
    // Mock the isLoggedIn state to be true
    jest.spyOn(store, 'getState').mockReturnValue({ isLoggedIn: true });

    render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    // Assert that the Navbar component is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders Auth component when user is not logged in', () => {
    // Mock the isLoggedIn state to be false
    jest.spyOn(store, 'getState').mockReturnValue({ isLoggedIn: false });

    render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    // Assert that the Auth component is rendered
    expect(screen.getByTestId('auth')).toBeInTheDocument();
  });
});

