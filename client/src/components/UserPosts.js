import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Posts from './Posts'
import Card from 'react-bootstrap/Card'

function UserPosts() {
    const [userPosts, setUserPosts] = useState([]);
    const id = localStorage.getItem('userId');

    const fetchUserPosts = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/myposts`, {
                params: {
                    _id: id
                }
            });
            const posts = res.data;
            console.log("Response data: ", res.data)
            console.log("Posts in the UserPosts component: ", posts)
            setUserPosts(posts);

        } catch (error) {
            console.log('Error fetching user posts', error);
        }
    }, [id]);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    return (
        <div className='bg-dark card-container'>
        {fetchUserPosts.length === 0 ? (
          <h3 className='text-white m-5'>No posts to display</h3>
        ) : (
          fetchUserPosts.map((post) => (
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
}

export default UserPosts;