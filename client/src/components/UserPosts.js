import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

function UserPosts () {
  // Declare state variable and its setter 
    const [userPosts, setUserPosts] = useState([]);
    const id = localStorage.getItem('userId');
    

    const fetchUserPosts = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/myposts?_id=${id}`);
            const { posts } = res.data.user; 
            console.log("Response data: ", res.data)
            console.log("Type of posts log: ", typeof posts);

            const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setUserPosts(sortedPosts);


            console.log(posts);

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
                <Card.Subtitle>{post.user}</Card.Subtitle>
                <small className="text-muted">Posted: 
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </small>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    );
}

export default UserPosts;