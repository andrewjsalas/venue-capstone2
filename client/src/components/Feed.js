import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Feed() {
  const [posts, setPosts] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/post/all`);
      const data = res.data;

      // Sorts the posts based on createdAt (newest first)
      const sortedPosts = [...data.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setPosts(sortedPosts);
    } catch (error) {
      console.log('Error fetching posts', error);
    }
  };

  // Display ALL posts from all users
  useEffect(() => {
    fetchPosts();
  });

  return (
    <div>
    <div className='bg-dark card-container'>
      {posts.length === 0 ? (
        <h4 className='text-white m-5'>No posts to display</h4>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className='post-card mb-3 mt-3'>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <Card.Subtitle className='d-flex font-weight-normal'>{post.name}</Card.Subtitle>
                <small className='text-muted ml-2'>
                  - Posted:{' '}
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </small>
              </div>
              <Card.Title className='mt-2'>{post.title}</Card.Title>
              <Card.Text className='mt-3'>{post.body}</Card.Text>
                
            </Card.Body>
          </Card>
        ))
      )}
              
    </div>
    </div>
  );
}

export default Feed;
