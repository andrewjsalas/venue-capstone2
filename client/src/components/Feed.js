import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/post/all');
                setPosts(response.data.posts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [])

    return (
        <>
            <div className="container mt-5">
                <h1>Feed</h1>
                {posts.length === 0 ? (
                    <p>No posts to display</p>
                ) : (
                    <div className="row">
                        {posts.map((post) => (
                            <div className="col-md-4 mb-4" key={post._id}>
                                <Card key={post._id} className='mb-3'>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.content}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div> 
        </>
    );
};

export default Feed;