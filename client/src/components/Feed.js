import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Feed() {
    const [posts, setPosts] = useState([]);
    const id = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('http://localhost:3001/api/post/all');
            const data = res.data;
            console.log('Data', data);

            // Sort the posts based on createdAt (newest first)
            const sortedPosts = [...data.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setPosts(sortedPosts);
          } catch (error) {
            console.log('Error fetching posts', error);
          }
        };

        fetchPosts();
    }, []);

    // Deletes a post
    // const handleDeletePost = async (postId) => {
    //   try {
    //     await axios.delete(`http://localhost:3001/api/post/${postId}`);
    //     setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    //     console.log('Error is in DeletePost');
    //   } catch (error) {
    //     console.log('Error deleting post', error);
    //   }
    // }

    return (
        <div className='bg-dark card-container'>
          {posts.length === 0 ? (
            <h4 className='text-white m-5'>No posts to display</h4>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className='post-card mb-3 mt-3'>
                <Card.Body>
                  <Card.Title className='card-title'>{post.title}</Card.Title>

                  <small className="text-muted">Posted: 
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </small>

                  {/* <Card.Subtitle>{post.userName}</Card.Subtitle> */}
                  <Card.Text>{post.body}</Card.Text>
                  
                  {/* {post.user._id === id && (
                    <div>
                      <Button variant='warning' className='mr-2'>
                        <Link
                          to={`/update/${post._id}`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )} */}

                </Card.Body>
              </Card>
            ))
          )}
        </div>
      );
};

export default Feed;