import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from "axios";

import { Form, Button, Card, CardGroup } from "react-bootstrap";

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hooks for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      isReq = false;
    }

    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://jude-movie-api.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login');
          window.open('/', '_self'); // _self is necessary for opening page in same tab
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Welcome to MyFlix</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
          <Form>
            <Form.Group className="reg-form-inputs mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Enter a password"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be min 6 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
              </Form.Text>
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
          <Button className="mb-1" type="submit" onClick={handleRegister}>Register</Button>
          <Card.Text>
            Already registered? <Card.Link href="javascript:void(0)">Sign in</Card.Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );

}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date
  }),
};