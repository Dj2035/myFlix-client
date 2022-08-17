import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';

import { Button, Container, Row, Col, Card } from "react-bootstrap";

import "./movie-view.scss"

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      favoriteMovies: []
    };
  }

  addFavMovie = (movieId) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    this.setState({ favoriteMovies: [movieId] });
    axios.post(
      `https://jude-movie-api.herokuapp.com/users/${username}/movies/${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been added from your list.`);
        window.open('/users/:username', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Card>
          <Card.Header>
            <Card.Img variant="top" crossOrigin="true" src={movie.ImagePath} />
          </Card.Header>
          <Card.Body>
            <Row className="movie-title mb-2">
              <Col className="label" xs lg="3">Title: </Col>
              <Col className="value" xs lg="9">{movie.Title}</Col>
            </Row>

            <Row className="movie-description mb-2">
              <Col className="label" xs lg="3">Description: </Col>
              <Col className="value" xs lg="9">{movie.Description}</Col>
            </Row>

            <Row className="movie-actors mb-2">
              <Col className="label" xs lg="3">Actors: </Col>
              <Col className="value" xs lg="9">{movie.Actors}</Col>
            </Row>

            <Row className="movie-genre mb-2">
              <Col className="label" xs lg="3">Genre: </Col>
              <Col xs lg="9">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </Col>
            </Row>

            <Row className="movie-director mb-2">
              <Col className="label" xs lg="3">Description: </Col>
              <Col xs lg="9">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </Col>
            </Row>

            <Row className="movie-release-year mb-2">
              <Col className="label" xs lg="3">Release year: </Col>
              <Col className="value" xs lg="9">{movie.ReleaseYear}</Col>
            </Row>
          </Card.Body>

          <Card.Footer>
            <Button className="button ml-2" onClick={() => { this.addFavMovie(movie._id); }}>
              Add to favorites
            </Button>
            <Button className="button ml-2" onClick={() => { onBackClick(null); }} >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container >
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