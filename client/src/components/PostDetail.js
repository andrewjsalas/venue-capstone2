import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function PostDetail() {
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

  const updatePostRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/post/update/${id}`, {
        title: inputs.title,
        body: inputs.body,
      });

      const data = res.data;
      return data;
    } catch (error) {
      console.log("updatePostRequest error: ", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await updatePostRequest();
      console.log("Update post data: ", data);
      navigate('../myposts');
    } catch (error) {
      console.log("handleSubmit in PostDetail.js error: ", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/post/${id}`);
        const data = res.data;
        console.log("fetchDetails: ", data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchDetails()
      .then((data) => {
        setPost(data);
        setInputs({
          title: data.post.title,
          body: data.post.body,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

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
          </div>
        </Form>
      )}
    </div>
  );
}

export default PostDetail;
