import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function NavBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Venue
        </Navbar.Brand>
        {isLoggedIn && (
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/myposts"
              active={isActiveRoute("/myposts")}
            >
              My Posts
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/posts/add"
              active={isActiveRoute("/posts/add")}
            >
              Create Post
            </Nav.Link>
          </Nav>
        )}
        <Nav className="ms-auto">
          {!isLoggedIn && (
            <>
              <Button as={Link} to="/auth" variant="contained" className="me-2">
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
              className="me-2"
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
