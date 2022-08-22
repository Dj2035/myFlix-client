import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Col
        xs={{ span: 8, offset: 1 }}
        sm={{ span: 6, offset: 2 }}
        md={{ span: 5, offset: 0 }}
        lg={4}
        xl={3}
        className="mb-3"
      >
        <Card className="movieCard" >
          <Link to={`/movies/${movie._id}`}>
            <Card.Img crossOrigin="true" variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    );
  }
}


//Check propTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};