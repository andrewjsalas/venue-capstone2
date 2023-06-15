import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from './Auth';
import axios from 'axios';

describe('Auth component', () => {
  test('renders the authentication form', () => {
    render(<Auth />);
  
    // Check if the form element is present in the rendered component
    const formElement = screen.getByTestId('auth-form');
    expect(formElement).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(<Auth />);
  
    // Get the input elements by their name attribute
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Simulate typing values into the input fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if the input values are updated correctly
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits the form', () => {
    render(<Auth />);
  
    // Mock the necessary functions and APIs
    const handleSubmit = jest.fn();
    const axiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });

    // Get the submit button and click it
    const submitButton = screen.getByText('Sign In');
    fireEvent.click(submitButton);

    // Check if the submit button was clicked and if the axios.post function was called
    expect(handleSubmit).toHaveBeenCalled();
    expect(axiosPost).toHaveBeenCalled();
  });
});
