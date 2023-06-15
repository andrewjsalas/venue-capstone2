import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AddPost from './AddPost';

jest.mock('axios');

describe('AddPost', () => {
    // Unit Tests //
  it('renders the add post form', () => {
    render(<AddPost />);
    // Verifies the form elements are rendered correctly
    expect(screen.getByText('Create a post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Body')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<AddPost />);
    // Simulate and verify input changes and values are updated
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Body'), {
      target: { value: 'Test Body' },
    });

    expect(screen.getByPlaceholderText('Title').value).toBe('Test Title');
    expect(screen.getByPlaceholderText('Body').value).toBe('Test Body');
  });

  // Integration tests // 
  it('submits the form and adds a post', async () => {
    render(<AddPost />);
    const mockData = { success: true };
    axios.post.mockResolvedValueOnce({ data: mockData });

    // Simulate the form submission and API call
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Body'), {
      target: { value: 'Test Body' },
    });
    fireEvent.click(screen.getByText('Submit'));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/post/add', {
      title: 'Test Title',
      body: 'Test Body',
      name: expect.any(String),
      user: expect.any(String),
    });

    await screen.findByText('Create a post'); // Wait for navigation

    // Verify that the form is reset and the component state is updated after a successful submission
    expect(screen.getByText('Create a post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title').value).toBe('');
    expect(screen.getByPlaceholderText('Body').value).toBe('');
  });
});
