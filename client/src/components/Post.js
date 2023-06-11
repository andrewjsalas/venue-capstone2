import React from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const Post = ({ title, body, name, isUser, id }) => {
    const navigate = useNavigate();

    const handleEdit = (event) => {
        navigate(`/myposts/${id}`);
    };

    const deleteRequest = async () => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/post/${id}`);
            const data = res.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRequest();
            navigate('/');
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <div className='bg-dark card-container'>
            <Card className='post-card mb-3 mt-3'>
                <Card.Body>
                    <Card.Title className='card-title'>{title}</Card.Title>
                    <Card.Subtitle>{name}</Card.Subtitle>
                    <Card.Text>{body}</Card.Text>
                    {isUser && (
                        <div>
                            <Button 
                                variant="primary"
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    )}                   
                </Card.Body>
            </Card>
        </div>
    );
};

export default Post;
