import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
    const [posts, setPosts] = useState();

    const sendRequest = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/post');
            console.log("Test result ", res);

            const data = res.data;
            return data.posts;
        } catch (error) {
            console.log("Error is in Posts() Posts.js", error);
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