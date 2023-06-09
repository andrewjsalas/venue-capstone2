import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

function UserPosts () {
    const [userPosts, setUserPosts] = useState([]);
    const id = localStorage.getItem('userId');

    const fetchUserPosts = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/myposts`, {
                params: {
                    _id: id
                }
            });
            const { posts } = res.data.user;
            console.log("Response data: ", res.data)
            console.log("Posts in the UserPosts component: ", posts)
            // setUserPosts(posts);


            const postPromises = posts.map(async (postId) => {
              const postRes = await axios.get(`http://localhost:3001/api/posts/${postId}`);
              return postRes.data.post;
            });

            const fetchedPosts = await Promise.all(postPromises);

            setUserPosts(fetchedPosts);
        } catch (error) {
            console.log('Error fetching user posts', error);
        }
    }, [id]);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    return (
        <div className='bg-dark card-container'>
        {userPosts.length === 0 ? (
          <h3 className='text-white m-5'>No posts to display</h3>
        ) : (
          userPosts.map((post) => (
            <Card key={post._id} className='post-card mb-3 mt-3'>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle>{post.user.name}</Card.Subtitle>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    );
}

export default UserPosts;