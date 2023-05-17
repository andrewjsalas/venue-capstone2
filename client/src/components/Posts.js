import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
    const [posts, setPosts] = useState();
    const sendRequest = async () => {
        const res = await axios 
            .get('http://localhost:3001/server/post')
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
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
                        userName={post.user.name}
                    />
                ))}
        </div>
    );
}

export default Posts;