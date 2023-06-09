import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Post from './Post'

function Feed() {
    const [posts, setPosts] = useState([]);
    const id = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('http://localhost:3001/api/post/all');
            const data = res.data;
            console.log(data);
            setPosts(data.posts);
          } catch (error) {
            console.log('Error fetching posts', error);
          }
        };

        fetchPosts();
    }, []);

    return (
        <div className='bg-dark card-container'>
          {posts.length === 0 ? (
            <h4>No posts to display</h4>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className='post-card mb-3 mt-3'>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle>{post.name}</Card.Subtitle>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      );
};

export default Feed;