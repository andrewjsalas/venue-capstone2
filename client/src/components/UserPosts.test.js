import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'; // Import your Redux store
import UserPosts from './UserPosts';

describe('UserPosts component', () => {
  test('displays user posts', () => {
    // Mock userPosts data
    const userPosts = [
      {
        _id: 'post1',
        name: 'User1',
        createdAt: new Date().toISOString(),
        title: 'Post 1',
        body: 'This is post 1',
      },
      {
        _id: 'post2',
        name: 'User2',
        createdAt: new Date().toISOString(),
        title: 'Post 2',
        body: 'This is post 2',
      },
    ];

    render(
      <Router>
        <Provider store={store}>
          <UserPosts />
        </Provider>
      </Router>
    );

    // Check if the user posts are displayed
    userPosts.forEach((post) => {
      const postTitle = screen.getByText(post.title);
      expect(postTitle).toBeInTheDocument();

      const postBody = screen.getByText(post.body);
      expect(postBody).toBeInTheDocument();
    });
  });

  test('allows editing of posts', () => {
    // Mock userPosts data
    const userPosts = [
      {
        _id: 'post1',
        name: 'User1',
        createdAt: new Date().toISOString(),
        title: 'Post 1',
        body: 'This is post 1',
      },
    ];

    render(
      <Router>
        <Provider store={store}>
          <UserPosts />
        </Provider>
      </Router>
    );

    // Find the Edit button and click it
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Find the title and body input fields
    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);

    // Modify the title and body values
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Updated Body' } });

    // Find the Submit button and click it
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Check if the updated post is displayed
    const updatedPostTitle = screen.getByText(/updated title/i);
    expect(updatedPostTitle).toBeInTheDocument();

    const updatedPostBody = screen.getByText(/updated body/i);
    expect(updatedPostBody).toBeInTheDocument();
  });

  test('allows deleting of posts', () => {
    // Mock userPosts data
    const userPosts = [
      {
        _id: 'post1',
        name: 'User1',
        createdAt: new Date().toISOString(),
        title: 'Post 1',
        body: 'This is post 1',
      },
    ];

    render(
      <Router>
        <Provider store={store}>
          <UserPosts />
        </Provider>
      </Router>
    );

    // Find the Delete button and click it
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Check if the post is deleted
    const deletedPostTitle = screen.queryByText(/post 1/i);
    expect(deletedPostTitle).not.toBeInTheDocument();
  });

  test('displays "No posts to display" when no user posts', () => {
    // Mock empty userPosts data
    const userPosts = [];

    render(
      <Router>
        <Provider store={store}>
          <UserPosts />
        </Provider>
      </Router>
    );

    // Check if the "No posts to display" message is shown
    const noPostsMessage = screen.getByText(/no posts to display/i);
    expect(noPostsMessage).toBeInTheDocument();
  });
});
