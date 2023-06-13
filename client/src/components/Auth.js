import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import logo from '../assets/full_logo_black.png';

// Authentication for new and returning users
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isSignup, setIsSignup] = useState(false);
    const API_URL = process.env.REACT_APP_MONGODB_URI;

    const handleChange = (event) => {
        setInputs((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value,
        }));
    };

    // Retrieves required user information from mongodb 
    const sendRequest = async (type = 'signin') => {
        try {
            const res = await axios.post(`${API_URL}/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
            throw new Error('Request failed');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const handleAuthentication = (data) => {
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem('userName', data.user.name);
            dispatch(authActions.signin(data.user));
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
        <>
            <div className="auth-container">
                <Row className="mt-5">
                    <Col sm={6} className="logo-column d-flex align-items-center justify-content-center">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </Col>

                    <Col sm={6} className="d-flex align-items-center justify-content-center">
                        <Card className="p-4 shadow w-75">
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <h3>{isSignup ? 'Sign Up' :     'Sign In'}</h3>
                                </div>
                                {isSignup && (
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            name="name"
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Name"
                                            value={inputs.name} />
                                    </Form.Group>
                                )}


                                <Form.Group className="mb-3">
                                    <Form.Control
                                        name="email"
                                        onChange={handleChange} 
                                        type="email" 
                                        placeholder="Email"
                                        value={inputs.email} 
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        name="password"
                                        onChange={handleChange}
                                        type="password" 
                                        placeholder="Password"
                                        value={inputs.password} 
                                    />
                                </Form.Group>

                                <Button 
                                    className="d-flex mb-3  shadow" 
                                    variant="dark" 
                                    type="submit"
                                >
                                    {isSignup ? 'Create Account' :  'Sign In'}
                                </Button>
                                <Button
                                    className="shadow"
                                    onClick={() => setIsSignup  (!isSignup)}
                                    variant="light"
                                >
                                    {isSignup ? 'Have an account?   Sign In': 'New user? Sign Up'}
                                </Button>
                            </Form>
                        </Card>
                    </Col>    
                </Row>  
            </div>
        </>
    );
};

export default Auth;