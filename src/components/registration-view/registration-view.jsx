import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
  }

  return (
    <Container className="registration-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Welcome to MyFlix</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Enter a password"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Your password must be min 6 characters long, contain letters and numbers,
                      and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Form>
                <Button className="mb-1" type="submit" onClick={handleSubmit}>Sign Up</Button>
                <Card.Text>
                  Already a member? <Card.Link href="javascript:void(0)" onClick={() => props.onPageChange("login")}>Sign in</Card.Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );

}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date
  }).isRequired,
  onRegistration: PropTypes.func.isRequired
};