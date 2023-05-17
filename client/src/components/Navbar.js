import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function navBar () {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Venue
                </Navbar.Brand>
                {isLoggedIn && (
                    <Nav className="ms-auto">
                        <Nav.Link 
                            as={Link} 
                            to='/myPosts' 
                            active={value === 'my'} 
                            onClick={() => setValue('my')}
                        >
                            My Posts
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/posts/add'
                            active={value === 'created'}
                            onClick={() => setValue('create')}
                        >
                            Create Post
                        </Nav.Link>
                    </Nav>
                )}
                <Nav className="ms-auto">
                    {!isLoggedIn && (
                        <>
                            <Button 
                                as={Link}
                                to='/auth'
                                variant="contained"
                                className="me-2"
                            >
                                Sign In
                            </Button>
                            <Button 
                                as={Link}
                                to='/auth'
                                variant='contained'
                                className="me-2"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            as={Link}
                            to='/'
                            variant="contained"
                            className="me-2"
                        >
                            Log Out
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default navBar;