import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Post from './Post';

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
            const { posts } = res.data;
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
        <div>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  isUser={true}
                  title={post.title}
                  body={post.body}
                />
              ))
            ) : (
              <p>No posts found.</p>
            )}
        </div>
    );
}

export default UserPosts;