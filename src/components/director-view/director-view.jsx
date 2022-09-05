import React from "react";
import PropTypes from "prop-types";

import { Button, Container, Row, Col, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, directorMovies } = this.props;

    return (
      <Container className="director-view mt-5">
        <Card>
          <Card.Header as="h2" className="value text-center">
            {director.Name}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="label fw-bold" md={3}>Born on:</Col>
              <Col className="value">{director.Birth}</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col className="label fw-bold">Biography:</Col>
            </Row>
            <br />
            <Row>
              <Col className="value">{director.Bio}</Col>
            </Row>
          </Card.Body>

          <Card.Body>
            <Row>
              <Col className="label fw-bold">Some movies produced by {director.Name}:</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              {directorMovies.map((movie) => (
                <Col xs={12} md={6} lg={4} key={movie._id}>
                  <Figure>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image
                        src={movie.ImagePath}
                        alt={movie.Title}
                        crossOrigin="anonymous"
                        key={movie._id}
                        movie={movie}
                      />
                      <Figure.Caption>
                        {movie.Title}
                      </Figure.Caption>
                    </Link>
                  </Figure>
                </Col>
              ))}
            </Row>
          </Card.Body>

          <Card.Footer>
            <Button
              className="my-4"
              variant="warning"
              onClick={() => {
                onBackClick(null);
              }}
            >
              « Back
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