import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import logo from '../assets/logo_cream.png'

function NavBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <Navbar className="nav-container">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/"
          className="nav-logo"  
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="nav-logo" 
          />
        </Navbar.Brand>

        {/* Only displays nav links if user is logged in */}
        {isLoggedIn && (
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/myposts"
              active={isActiveRoute("/myposts")}
              className="text-light nav-link me-2"
            >
              My Posts
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add"
              active={isActiveRoute("/post/add") ? 'active' : ''}
              className="text-light nav-link me-2"
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
                to="/auth" 
                variant="contained" 
                className="me-2"
              >
                Sign In 
              </Button>

              <Button
                as={Link}
                to="/auth"
                variant="contained"
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
              to="/"
              variant="contained"
              className="me-2 text-light nav-link nav-logout"
            >
              Log Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
