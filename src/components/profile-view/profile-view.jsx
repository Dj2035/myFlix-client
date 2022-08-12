import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { FavMovies } from './favorite-movies';
import { UpdateUser } from './update-user';



import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://jude-movie-api.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavouriteMovies(response.data.FavouriteMovies)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [])

  // Delete Profile
  const handleDelete = () => {
    axios.delete(`https://jude-movie-api.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch(error => console.error(error))
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Title>Your Info</Card.Title>
            <Card.Body>
              <Row className="mb-2">
                <Col className="label" xs lg="3">Username: </Col>
                <Col className="value" xs lg="9">{user.Username}</Col>
              </Row>
              <Row className="mb-2">
                <Col className="label" xs lg="3">Email: </Col>
                <Col className="value" xs lg="9">{user.Email}</Col>
              </Row>
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} />
              <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <FavMovies
          movies={movies}
          favouriteMovies={favouriteMovies}
          currentUser={currentUser}
          token={token}
        />
      </Row>
      <Button className="button ml-2" onClick={() => { onBackClick(null); }} >
        Back
      </Button>

    </Container >
  )

}