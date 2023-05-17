import React from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const Post = ({ title, body, userName, isUser, id }) => {
    const navigate = useNavigate();
    const handleEdit = (event) => {
        navigate(`/myPosts/${id}`);
    };

    const deleteRequest = async () => {
        const res = await axios
            .delete(`http://localhost:3001/server/post/${id}`)
            .catch((err) => console.log(err));

            const data = res.data;
            return data;
    };

    const handleDelete = () => {
        deleteRequest().then(() => navigate('/'));
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