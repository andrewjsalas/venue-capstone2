import React from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const Post = ({ title, body, userName, isUser, id }) => {
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
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{userName}</Card.Subtitle>
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