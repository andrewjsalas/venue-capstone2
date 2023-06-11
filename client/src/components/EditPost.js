import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const getPostDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/post/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updatePost = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/api/post/update/${id}`, {
        title: inputs.title,
        body: inputs.body,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/post/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await updatePost();
      console.log(data);
      navigate('/myposts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await deletePost();
      console.log(data);
      navigate('/myposts');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails()
      .then((data) => {
        setPost(data);
        setInputs({
          title: data.post.title,
          body: data.post.body,
        });
      })
      .catch((error) => console.log(error));
  });

  return (
    <div>
      {post && (
        <Form onSubmit={handleSubmit}>
          <div>
            <h3>Edit Post</h3>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                value={inputs.body}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="mt-2 rounded"
            >
              Update Post
            </Button>

            <Button
              variant="danger"
              className="mt-2 rounded ml-2"
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default EditPost;
