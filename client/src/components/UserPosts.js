import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Post from './Post';

function UserPosts() {
    const [user, setUser] = useState();
    const id = localStorage.getItem('userId');

    const sendRequest = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/${id}`);
            const data = res.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await sendRequest();
                setUser(data.user);
            } catch (error) {
                console.log('Error fetching user data', error);
            }
        };

        fetchData();
    }, [sendRequest]);

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