import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function UserPosts() {
    const [user, setUser] = useState();
    const id = localStorage.getItem('userId');

    const sendRequest = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/${id}`);
            const data = res.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    }, []);

    return (
        <div>
            {" "}
            {user &&
                user.posts &&
                user.posts.map((post) => (
                    <Post 
                        key={post._id}
                        id={post._id}
                        isUser={true}
                        title={post.title}
                        body={post.body}
                    />
                ))}
        </div>
    )
}

export default UserPosts;