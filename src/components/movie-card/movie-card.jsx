import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className="movieCard-container">

        <Card className="movieCard" >
          <Link to={`/movies/${movie._id}`}>
            <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
            </Card.Body>
          </Link>
        </Card>

      </Container>
    );
  }
}


//Check propTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string
  }).isRequired,
};