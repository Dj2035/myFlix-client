import React from "react";
import PropTypes from "prop-types";

import { Button, Row, Col, Card } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <>
        <Card className="genre-view" bg="dark" >
          <Card.Header className="genre-view-header">{genre.Name}</Card.Header>
          <Card.Body>
            <Row>
              <Col className="label">Description:</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col className="value">{genre.Description}</Col>
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
      </>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};