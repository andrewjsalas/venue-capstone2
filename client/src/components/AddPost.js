import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
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

    const sendRequest = async (type = "signing") => {
        // const userId = localStorage.getItem("userId");
        // const userName = localStorage.getItem('userName');
        // const postId = req.params._id;
        // console.log(userId);

        try {
            const res = await axios.post("http://localhost:3001/api/post/add", {
                title: inputs.title,
                body: inputs.body,
                name: localStorage.getItem('userName'),
                user: localStorage.getItem("userId")
            });
            
            return res.data;
        } catch (error) {
            console.log("Error is in sendRequest addPost.js" ,error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await sendRequest();
            console.log("Data inside the handleSubmit() function", data);
            setInputs('');
            navigate('/');
        } catch (error) {
            console.log("Error is in handleSubmit addPost.js", error);
            throw error;
        }
    };

    return (
        <div>
            <h1 className='add-post-header text-white mt-3 text-center'>Create a post</h1>
            <Card className="mt-4 p-4 shadow add-post-card">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='add-post-title mb-3'>
                        {/* <Form.Label>Title</Form.Label> */}
                        <Form.Control 
                            name='title'
                            onChange={handleChange}
                            type='text'
                            placeholder='Title'
                            value={inputs.title}
                        />
                    </Form.Group>
                    
                    <Form.Group className='add-post-body mb-3'>
                        {/* <Form.Label>Body</Form.Label> */}
                        <Form.Control
                            as='textarea' 
                            name='body'
                            onChange={handleChange}
                            type='text'
                            placeholder='Body'
                            value={inputs.body}
                        />
                    </Form.Group>

                    <Button
                        className='shadow'
                        variant='dark'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default AddPost;