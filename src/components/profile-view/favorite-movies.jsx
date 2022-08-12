import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Figure, Card } from 'react-bootstrap';

import './profile-view.scss';
import axios from 'axios';

function FavMovies(props) {
  const { movies, favouriteMovies, currentUser, token } = props;

  const favouriteMoviesId = favouriteMovies.map(m => m._id)

  const favouriteMoviesList = movies.filter(m => {
    return favouriteMoviesId.includes(m._id)
  })

  const delFavMovie = (movieId) => {
    let url = `https://jude-movie-api.herokuapp.com/users/${currentUser}/movies/${movieId}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The movie was successfully deleted.`)
        window.open('/users/:username', '_self');
      }).
      catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favouriteMoviesList.length === 0 ? (
        <p>You have no favourite movies yet.</p>
      ) : (
        < Card >
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {favouriteMoviesList.map((movie) => {
                return (
                  <Col xs={12} md={6} lg={3} Key={_id} className="fav-movie">
                    <Figure>
                      <Link to={`/movies/${movies._id}`}>
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
                    <Button variant="secondary" onClick={() => delFavMovie(movie._id)} >Remove</Button>
                  </Col>
                )
              })}
            </Row>
          </Card.Body>
        </Card >
      )
      }
    </Fragment>
  )
}

export default FavMovies;