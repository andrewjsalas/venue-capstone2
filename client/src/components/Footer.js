import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <p>
              &copy; {new Date().getFullYear()} VENUE | All rights reserved
            </p>
            <p>This app was created by: Andrew J Salas</p>
            <p>
                <a 
                    href="https://github.com/your-github" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i 
                        className="fab fa-github mr-3" 
                        style={{ color: 'white' }}>
                    </i>
                </a>{' '}
                |{' '}
                <a 
                    href="https://www.linkedin.com/in/your-linkedin" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i 
                        className="fab fa-linkedin ml-3" 
                        style={{ color: 'white' }}>
                    </i>
                </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
