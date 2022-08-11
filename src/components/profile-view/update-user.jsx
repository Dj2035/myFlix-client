import React from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <Form className='profile-form'>
      <h2>Want to change some info?</h2>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          defaultValue={user.Username}
          onChange={e => handleUpdate(e)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          defaultValue=""
          onChange={e => handleUpdate(e)}
          required
          minLength="6"
          placeholder="Your password must be 6 or more characters"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          defaultValue={user.Email}
          onChange={e => handleUpdate(e.target.value)}
          required
          placeholder="Enter your email address"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          defaultValue={user.Birthday}
          onChange={e => handleUpdate(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  )
}

export default UpdateUser;