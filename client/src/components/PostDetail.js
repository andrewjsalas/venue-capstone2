import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';

function PostDetail () {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const id = useParams().id;

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        setInputs((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value,
        }));
    };
    
    const sendRequest = async () => {
        const res = await axios
        .put(`http://localhost:3001/api/post/update/${id}`, {
            title: inputs.title,
            body: inputs.body,
            })
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
        };

    const handleSubmit = async (event) => {
        event.preventDefault();
        sendRequest()
        .then((data) => console.log(data))
        .then(() => navigate('./myPosts'));
    };
    
    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axios
                .get(`http://localhost:3001/api/post/${id}`)
                .catch((err) => console.log(err));
    
            const data = res.data;
            return data;
        };
        
        fetchDetails().then((data) => {
            setPost(data);
            setInputs({
                title: data.post.title,
                body: data.post.body
            });
        });
    }, [id]);


    return (
        <div>
            {inputs && (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h3>Create A Post</h3>
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
                            Submit Post
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    )
}

export default PostDetail;

