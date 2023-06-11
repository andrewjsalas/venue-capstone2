import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [inputs, setInputs] = useState({
    title: '', 
    body: ''
  });
  const id = localStorage.getItem('userId');

  /// Fetch the user's posts ///
  const fetchUserPosts = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/myposts?_id=${id}`);
      const { posts } = res.data.user;
      const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserPosts(sortedPosts);
    } catch (error) {
      console.log('Error fetching user posts', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  /// Edit post handler ///
  const handleEdit = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }

  // Cancel post edit without saving any changes.
  const handleCancelEdit = () => {
    setEditPostId(null);
  };

  // Fetch post to update, and update it
  const handleUpdatePost = async (postId) => {
    try {
      const postToUpdate = userPosts.find((post) => post._id === postId);
      const updatedPost = { ...postToUpdate, title: inputs.title, body: inputs.body };
      await axios.put(`http://localhost:3001/api/post/update/${postId}`, updatedPost);
      fetchUserPosts();
      setEditPostId(null);
    } catch (error) {
      console.log(`Error updating post with ID: ${postId}`, error);
    }
  };

  /// Delete a post ///
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/post/${id}`);
      fetchUserPosts();
    } catch (error) {
      console.log(`Error deleting post with ID: ${id}`, error);
    }
  };

  if (userPosts.length === 0) {
    return <h3 className='text-white m-5'>No posts to display</h3>;
  }

  return (
    <div className='bg-dark card-container'>
      {userPosts.map((post) => (
        <Card key={post._id} className='post-card mb-3 mt-3'>
          <Card.Body>
            <div className='d-flex align-items-center'>
              <Card.Subtitle className='d-flex font-weight-normal'>{post.name}</Card.Subtitle>
              <small className="text-muted ml-2">- Posted:{' '}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </small>
            </div>
            <Card.Title className='mt-2'>{post.title}</Card.Title>
            <Card.Text className='mt-3'>{post.body}</Card.Text>

            {/* Edit and Delete buttons/form */}
            {editPostId === post._id ? (
              <Form>
                <div className='edit-form'>
                  <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='text'
                      name='title'
                      value={inputs.title}
                      onChange={handleEdit}
                    />
                  </Form.Group>

                  <Form.Group controlId='body'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='body'
                      value={inputs.body}
                      onChange={handleEdit}
                    />
                  </Form.Group>

                  <div className='d-flex justify-content-between'>
                    <Button variant='success' onClick={() => handleUpdatePost(post._id)}>
                      Submit
                    </Button>
                    <Button variant='danger' onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            ) : (
              <div className='d-flex justify-content-between'>
                <Button variant='primary' onClick={() => setEditPostId(post._id)}>
                  Edit
                </Button>
                <Button variant='danger' onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UserPosts;
