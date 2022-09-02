import React from "react";
import { Col, Row, Card } from 'react-bootstrap';


export function UserInfo({ email, name }) {

  return (
    <Row>
      <Col>

        <Card.Header as="h5">Your Info</Card.Header>
        <br />
        <p>Username: {name}</p>
        <p>Email: {email}</p>

      </Col>
    </Row>
  )
}