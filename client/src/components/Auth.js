import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (event) => {
        setInputs((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value,
        }));
    };

    const sendRequest = async (type = 'signin') => {
        try {
            const res = await axios.post(`http://localhost:3001/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });

            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error('Request failed');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const handleAuthentication = (data) => {
            localStorage.setItem("userId", data.user._id);
            dispatch(authActions.signin());
            navigate('/');
            console.log(data);
        };

        const handleError = (error) => {
            console.error(error);
        }

        const request = isSignup ? sendRequest("signup") : sendRequest();

        request
            .then(handleAuthentication)
            .catch(handleError);

    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h3>{isSignup ? 'Sign Up' : 'Sign In'}</h3>
            </div>
            {isSignup && (
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        value={inputs.name} />
                </Form.Group>
            )}


            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name="email"
                    onChange={handleChange} 
                    type="email" 
                    placeholder="Email"
                    value={inputs.email} 
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    name="password"
                    onChange={handleChange}
                    type="password" 
                    placeholder="Password"
                    value={inputs.password} 
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {isSignup ? 'Create Account' : 'Sign In'}
            </Button>
            <Button
                onClick={() => setIsSignup(!isSignup)}
                variant="primary"
            >
                {isSignup ? 'Have an account? Sign In': 'New user? Sign Up'}
            </Button>
        </Form>
    );
};

export default Auth;