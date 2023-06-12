import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white font-weight-light border-top border-secondary fixed-bottom ">
      <Container>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <p>
              &copy; {new Date().getFullYear()} VENUE | All rights reserved
            </p>
            <Row className="justify-content-center">
              <Col xs="auto">
                <p>This site was created by: Andrew J Salas</p>
              </Col>
              <Col xs="auto">
                <p>
                  <a
                    href="https://github.com/andrewjsalas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github mr-3" style={{ color: 'white' }}></i>
                  </a>
                  <span>|</span>
                  <a
                    href="https://www.linkedin.com/in/andrewjsalas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin ml-3" style={{ color: 'white' }}></i>
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
