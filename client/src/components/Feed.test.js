import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Feed from './Feed';

describe('Feed component', () => {
  test('displays "No posts to display" when there are no posts', () => {
    // Mock the necessary functions and APIs
    const axiosGet = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { posts: [] } });

    render(<Feed />);
  
    // Check if the "No posts to display" message is present when no posts are available
    const noPostsMessage = screen.getByText('No posts to display');
    expect(noPostsMessage).toBeInTheDocument();
    expect(axiosGet).toHaveBeenCalled();
  });

  test('displays posts when posts are available', () => {
    // Create a sample array of posts
    const samplePosts = [
      { _id: '1', name: 'John Doe', title: 'Post 1', body: 'This is post 1', createdAt: '2022-06-01T10:00:00.000Z' },
      { _id: '2', name: 'Jane Smith', title: 'Post 2', body: 'This is post 2', createdAt: '2022-06-02T14:30:00.000Z' },
    ];

    // Mock the necessary functions and APIs
    const axiosGet = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { posts: samplePosts } });

    render(<Feed />);
  
    // Check if the posts are displayed correctly
    const postElements = screen.getAllByTestId('post');
    expect(postElements).toHaveLength(samplePosts.length);
    expect(axiosGet).toHaveBeenCalled();
  });
});
