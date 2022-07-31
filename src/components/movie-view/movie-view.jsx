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
        <Row className="movie-genre mb-1">
          <Col className="label" xs lg="2">Genre: </Col>
          <Col className="value">{movie.Genre.Name}</Col>
        </Row>
        <Row className="genre-description mb-2">
          <Col className="label" xs lg="2">Description: </Col>
          <Col className="value">{movie.Genre.Description}</Col>
        </Row>
        <Row className="movie-director mb-1">
          <Col className="label" xs lg="2">Director: </Col>
          <Col className="value">{movie.Director.Name}</Col>
        </Row>
        <Row className="director-bio mb-1">
          <Col className="label" xs lg="2">Bio: </Col>
          <Col className="value">{movie.Director.Bio}</Col>
        </Row>
        <Row className="director-birthyear mb-1">
          <Col className="label" xs lg="2">BirthYear: </Col>
          <Col className="value">{movie.Director.Birth}</Col>
        </Row>
        <Row className="director-deathyear mb-2">
          <Col className="label" xs lg="2">DeathYear: </Col>
          <Col className="value">{movie.Director.Death}</Col>
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