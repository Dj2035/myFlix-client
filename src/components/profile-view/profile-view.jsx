import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//import FavMovies from './favorite-movies';
//import UpdateUser from './update-user';

import './profile-view.scss';

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [user, setUser] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const token = localStorage.getItem("token");
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const getUser = () => {
    const user = localStorage.getItem("user");
    axios.get(`https://jude-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUsername(response.data.Username)
        setEmail(response.data.Email)
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
        console.log(response);

        response.data.FavoriteMovies.forEach((movieId) => {
          let favMovies = props.movies.filter(
            (movie) => movie._id === movieId
          );
          setFavoriteMoviesList(favMovies);
          console.log(favoriteMoviesList)
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [])

  // Update Profile
  const handleUpdate = () => {
    const user = localStorage.getItem("user");
    axios.put(`https://jude-movie-api.herokuapp.com/users/${user}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        alert('Your profile has been updated');
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Error');
      });
  };

  // Delete Profile
  const handleDelete = () => {
    const user = localStorage.getItem("user");
    axios.delete(`https://jude-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch(error => console.error(error))
  };

  const delFavMovie = (movieId) => {
    const user = localStorage.getItem("user");
    let url = `https://jude-movie-api.herokuapp.com/users/${user}/movies/${movieId}`;
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
    <Container >
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body >
              <Card.Title>Your Info</Card.Title>
              <Row>
                Username:
              </Row>
              <Row className="mb-2">
                {user.Username}
              </Row>
              <Row>
                Email:
              </Row>
              <Row className="mb-2">
                {user.Email}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <Card.Title>Want to change some info?</Card.Title>
              <Form className='profile-form'>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.Username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value="*******"
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength="6"
                    placeholder="Your password must be 6 or more characters"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={user.Email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={user.Birthday}
                    onChange={e => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleUpdate}>
                  Update profile
                </Button>
                <Button className="d-block mt-2" variant="danger" onClick={handleDelete}>
                  Delete profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Fragment>
          {favoriteMoviesList.length === 0 ? (
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
                  {favoriteMoviesList.map((movie) => {
                    return (
                      <Col xs={12} md={6} lg={3} className="fav-movie">
                        <Figure Key={movie._id}>
                          <Link to={`/movies/${movie._id}`}>
                            <Figure.Image
                              src={movie.ImagePath}
                              alt={movie.Title}
                              crossOrigin="true"
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
      </Row>

      <Button className="button ml-2" onClick={() => { onBackClick(); }} >
        Back
      </Button>

    </Container >
  )

}

ProfileView.propTypes = {
  profileView: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};