import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Figure, Card } from 'react-bootstrap';

import './profile-view.scss';
import axios from 'axios';

function FavMovies(props) {
  const { movie, handleFavorite } = props;

  return (
    <Col xs={12} md={6} lg={3} className="fav-movie">
      <Figure>
        <Link to={`/movies/${movie._id}`}>
          <Figure.Image
            src={movie.ImagePath}
            alt={movie.Title}
            crossOrigin="anonymous"
          />
          <Figure.Caption>
            {movie.Title}
          </Figure.Caption>
        </Link>
      </Figure>
      <Button
        variant="outline-danger"
        className="mt-2 ml-auto"
        style={{ width: '100%' }}
        onClick={() => handleFavorite(movie._id, 'remove')}
      >
        Remove from ♥️
      </Button>
    </Col>
  )
}

export default FavMovies;