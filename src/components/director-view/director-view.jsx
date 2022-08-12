import React from "react";
import PropTypes from "prop-types";

import { Button, Container, Row, Col, Card } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Card>
          <Card.Header className="value">
            {director.Name}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="label" md={3}>Born on:</Col>
              <Col className="value">{director.Birth}</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col className="label">Biography:</Col>
            </Row>
            <br />
            <Row>
              <Col className="value">{director.Bio}</Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button
              className="mt-1"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired
};