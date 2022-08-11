import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { UserInfo } from './user-info';
import { FavMovies } from './favorite-movies';
import { UpdateUser } from './update-user';



import './profile-view.scss';
import { useEffect } from "react";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useStates({

  })

  const favoriteMovieList = movies.filter((movies) => {

  });

  const getUserData = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .get(`https://jude-movie-api.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setUserData(response.data);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);

        response.data.FavoriteMovies.forEach((movie_id) => {
          let favMovies = props.movies.filter(
            (movie) => movie._id === movie_id
          );
          setMovies(favMovies);
        });
      })
      .catch((error) => console.error(error));
  };

  // Delete Profile
  const handleDelete = (e) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.delete(`https://jude-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`The account ${user.Username} was successfully deleted.`);
    localStorage.clear();
    window.open("/register", "_self");
  };


  const handleSubmit = (e) => {

  }
  // Update Profile
  const handleUpdate = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .put(
        `https://jude-movie-api.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo username={user.Username} email={user.Email} />
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser handleSubmit={handleSubmit} hanleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavMovies favoriteMovieList={favoriteMovieList} />

      <Button className="mt-2 ml-4" onClick={handleDelete}>
        Delete your profile
      </Button>

    </Container >
  )

}