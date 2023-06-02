import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Post from './Post'

function Feed() {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/api/post/all');
    //             setPosts(response.data.posts);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchPosts();
    // }, [])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('http://localhost:3001/api/post/all');
            const data = res.data;
            setPosts(data.posts);
          } catch (error) {
            console.log('Error fetching posts', error);
          }
        };

        fetchPosts();
    }, []);

    return (
        <div>
          {posts.length === 0 ? (
            <h4>No posts to display</h4>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                body={post.body}
              />
            ))
          )}
        </div>
      );
    
};

export default Feed;