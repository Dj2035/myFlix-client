import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import PropTypes from "prop-types";

import "./login-view.scss";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <Container className="login-view" >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Login to MyFlix</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter a password"
                  />
                </Form.Group>
                <Button className="mb-1" variant="primary" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
              </Form>
              <Card.Text>
                Not yet a member? <Card.Link href="javascript:void(0)" onClick={() => props.onPageChange("register")}>Sign Up</Card.Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired
};


/*  
import React from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  };

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    console.log(username, password);

    Send a request to the server for authentication
    then call this.props.onLoggedIn(username)
    this.props.onLoggedIn(username);
  } 

  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
        </label>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }


} 

*/