import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./login-view.scss";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hooks for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  function validate() {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be atleast 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://jude-movie-api.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user')
        });
    }
  };

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
                    placeholder="Enter username"
                  />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                  />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button className="mb-1" variant="primary" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
                <br></br>
                <p>
                  Need an account? <Link to={"/register"}>Sign up</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );

}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
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