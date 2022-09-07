import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


import "./movie-view.scss"

export function MovieView(props) {
  const { movie, onBackClick } = props;

  const thisUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState(props.user);

  const getFavorite = () => {
    axios
      .get(`https://jude-movie-api.herokuapp.com/users/${thisUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
        console.log('1: ' + favoriteMovies)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getFavorite();
  }, []);

  const addFavMovie = (movie) => {
    if (favoriteMovies.includes(movie._id)) {
      return alert('Movie already exists in your list of favorite.');
    } else {
      return (
        axios.post(`https://jude-movie-api.herokuapp.com/users/${thisUser}/movies/${movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            alert('Movie successfully added to favorites.');
            window.open(`/users/${thisUser}`, '_self');
          })
          .catch(error => console.error(error))
      );
    }
  }

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
              onClick={() => addFavMovie(movie)}
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};