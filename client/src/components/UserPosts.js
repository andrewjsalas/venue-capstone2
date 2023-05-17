import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function UserPosts() {
    const [user, setUser] = useState();
    const id = localStorage.getItem('userId');
    const sendRequest = async () => {
        const res = await axios 
            .get(`http://localhost:3001/server/post/user/${id}`)
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };

    useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    }, []);

    return (
        <div>
            {" "}
            {user &&
                user.posts &&
                user.posts.map((post, index) => (
                    <Post 
                        id={post._id}
                        key={index}
                        isUser={true}
                        title={post.title}
                        body={post.body}
                        userName={user.name}
                    />
                ))}
        </div>
    )
}

export default UserPosts;