import React from "react";
import PropTypes from "prop-types";

import { Button, Row, Col, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, genreMovies } = this.props;

    return (
      <>
        <Card className="genre-view">
          <Card.Header as="h2" className="genre-view-header text-center">{genre.Name}</Card.Header>
          <Card.Body>
            <Row>
              <Col className="label fw-bold">Description:</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col className="value">{genre.Description}</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col className="label fw-bold">Some movies with {genre.Name} genre:</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row>
              {genreMovies.map((movie) => (
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
              variant="warning"
              className="mt-1"
              onClick={() => {
                onBackClick(null);
              }}
            >
              « Back
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