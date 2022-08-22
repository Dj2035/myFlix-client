import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";

import "./movie-view.scss"

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, isFavorite, handleFavorite } = this.props;

    if (!movie) return <div></div>;
    return (
      <Col
        className="container p-3 justify-content-center"
        md={9}
        lg={7}
        xl={6}
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

              <Button className="my-4" variant="warning" onClick={() => { onBackClick(null); }}>
                « Back
              </Button>
              {!isFavorite ? (
                <Button
                  className="my-4 ml-2"
                  variant="outline-primary"
                  onClick={() => handleFavorite(movie._id, 'add')}
                >
                  Add to 🤍 Movies
                </Button>
              ) : (
                <div>🤍</div>
              )}
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