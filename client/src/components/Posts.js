import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
    const [posts, setPosts] = useState();

    const sendRequest = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/post');
            const data = res.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    useEffect(() => {
        sendRequest().then((data) => setPosts(data.posts));
    }, []);

    return (
        <div>
            {posts && 
                posts.map((post, index) => (
                    <Post 
                        id={post._id}
                        isUser={localStorage.getItem("userId") === post.user._id}
                        title={post.title}
                        body={post.body}
                    />
                ))}
        </div>
    );
}

export default Posts;