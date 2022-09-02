import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { UserInfo } from './user-info';
import FavMovies from './favorite-movies';
import UserUpdate from './update-user';

import './profile-view.scss';

export function ProfileView(props) {

  const [user, setUser] = useState(props.user);
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios.get(`https://jude-movie-api.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(error => console.error(error));
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
  const deleteUser = () => {
    let isExecuted = confirm('Are you sure you want to delete your profile?')
    axios.delete(`https://jude-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response, isExecuted);
        if (isExecuted) {
          console.log(response);
          alert(`Profile deleted`)
          localStorage.clear();
          window.open('/', '_self');
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('Unable to delete profile')
      });
  };

  return (
    <Container>
      <Button variant='secondary' className="d-block mt-2 mb-2" onClick={() => { props.onBackClick(null); }}>« Back</Button>

      <Row>
        <Col key={user} xs={12} md={4}>
          <Card className='profile-view'>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <UserUpdate user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <h1 className="subtitle mt-4">FAVORITE MOVIES</h1>
            </Col>
          </Row>

          <Row>
            <FavMovies />
          </Row>
        </Card.Body>
      </Card>


      <Button variant="danger" className='delete-button' onClick={() => deleteUser()}>Delete Profile</Button>

    </Container >
  )

}