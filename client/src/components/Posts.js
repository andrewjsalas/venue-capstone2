import React, { useEffect, useState } from "react";
import axios from 'axios';
import Post from "./Post";

function Feed() {
    const [posts, setPosts] = useState([]);
    const id = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
  
    useEffect(() => {
      const fetchUserPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/user/myposts?_id=${id}`);
          const data = res.data;
          console.log('Data', data);
  
          // Sort the posts based on createdAt (newest first)
          const sortedPosts = [...data.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
          setPosts(sortedPosts);
        } catch (error) {
          console.log('Error fetching user posts', error);
        }
      };
  
      fetchUserPosts();
    }, [id]);
  
    return (
      <div>
        {/* Render the posts */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
  