import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss"

export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.addFavMovie = this.addFavMovie.bind(this)
  }

  addFavMovie(movie) {
    console.log(movie);

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://jude-movie-api.herokuapp.com/users/${user}/movies/${movie._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('Movie successfully added to favorites.')
        window.open(`/users/${user}`, '_self');
      })
      .catch(error => console.error(error))
  }




  render() {
    const { movie, onBackClick, isFavorite } = this.props;

    if (!movie) return <div></div>;
    return (
      <Col
        className="container p-3 justify-content-center"
        md={10}
        lg={8}
      >
        <Row className="justify-content-start">
          <Col sm={6}>
            <img
              crossOrigin="anonymous"
              className="poster"
              src={movie.ImagePath}
              alt=" Movie Poster"
            />
          </Col>
          <Col sm={6}>
            <div className="mt-2">
              <div className="title">{movie.Title} </div>

              <div className="mt-2">
                <span className="fw-bold">Release year: </span>
                <span className="ml-2">{movie.ReleaseYear}</span>
              </div>

              <div className="mt-2">
                <span className="fw-bold">Actors: </span>
                <span className="ml-2">{movie.Actors}{' '}</span>
              </div>

              <div className="mt-3">
                <span className="fw-bold">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button
                    variant="outline-dark"
                    className="ml-4 value text-uppercase"
                  >
                    {movie.Genre.Name}{' '}
                  </Button>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="outline-dark" className="value ml-1">
                    {movie.Director.Name}
                  </Button>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold">Overview</span>
                <span className="value">: {movie.Description}</span>
              </div>

              <Button
                className="my-4"
                variant="outline-primary"
                onClick={() => this.addFavMovie(movie)}
              >
                Add to Favorite
              </Button>

              <br />
              <Button className="my-4" variant="warning" onClick={() => { onBackClick(null); }}>
                « Back
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};