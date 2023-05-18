import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddPost = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        body: "",
    });

    const handleChange = (event) => {
        setInputs((preValue) => ({
            ...preValue,
            [event.target.name]: event.target.value,
        }));
    };

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/post/add", {
                title: inputs.title,
                body: inputs.body,
                user: localStorage.getItem("userId")
            });
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await sendRequest();
            console.log(data);
            navigate('/')
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name='title'
                    onChange={handleChange}
                    type='text'
                    placeholder='Post title'
                    value={inputs.title}
                />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Body</Form.Label>
                <Form.Control 
                    name='body'
                    onChange={handleChange}
                    type='text'
                    placeholder='Type body content'
                    value={inputs.body}
                />
            </Form.Group>

            <Button
                type='submit'
            >
                Submit
            </Button>
        </Form>
    )
}

export default AddPost;