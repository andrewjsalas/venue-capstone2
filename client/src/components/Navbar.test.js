import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'; // Import Redux store
import NavBar from './Navbar';

describe('NavBar component', () => {
  test('displays the logo', () => {
    render(
      <Router>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </Router>
    );
  
    // Check if the logo image is present
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });

  test('displays the navigation links', () => {
    render(
      <Router>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </Router>
    );
  
    // Check if the navigation links are present
    const myPostsLink = screen.getByRole('link', { name: /my posts/i });
    expect(myPostsLink).toBeInTheDocument();
  
    const createPostLink = screen.getByRole('link', { name: /create post/i });
    expect(createPostLink).toBeInTheDocument();
  });

  test('displays the authentication buttons', () => {
    render(
      <Router>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </Router>
    );
  
    // Check if the Sign In button is present
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // Check if the Sign Up button is present
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  test('displays the logout button when logged in', () => {
    render(
      <Router>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </Router>
    );
  
    // Check if the Logout button is present
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
