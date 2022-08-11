import React from 'react';
import PropTypes from "prop-types";

import { Button, Container, Row, Col, Accordion } from "react-bootstrap";

import "./movie-view.scss"

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row className="movie-poster mb-3">
          <Col>
            <img src={movie.ImagePath} crossOrigin="true" />
          </Col>
        </Row>

        <Row className="movie-title mb-2">
          <Col className="label" xs lg="2">Title: </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>

        <Row className="movie-description mb-2">
          <Col className="label" xs lg="2">Description: </Col>
          <Col className="value">{movie.Description}</Col>
        </Row>

        <Row className="movie-actors mb-2">
          <Col className="label" xs lg="2">Actors: </Col>
          <Col className="value">{movie.Actors}</Col>
        </Row>

        <Row className="movie-genre mb-2">
          <Col className="label" xs lg="2">Genre: </Col>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </Row>

        <Row className="movie-director mb-2">
          <Col className="label" xs lg="2">Description: </Col>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Genre.Description}</Button>
          </Link>
        </Row>

        <Row className="movie-release-year mb-2">
          <Col className="label" xs lg="2">Release year: </Col>
          <Col className="value">{movie.ReleaseYear}</Col>
        </Row>

        <Button className="movie-button-div" onClick={() => { onBackClick(null); }} >Back</Button>
      </Container>
    );
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.string,
      DeathYear: PropTypes.string
    }),
    ReleaseYear: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};