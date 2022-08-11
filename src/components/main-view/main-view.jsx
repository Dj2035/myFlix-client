import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import { BrowerRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';

import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from '../profile-view/profile-view';

import "./main-view.scss";

// Component names should always start with capital letters
class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://jude-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` 
  property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state; //ES6 feature for const movies = this.state.movies

    return (
      <Router>
        <Menubar user={user} />
        <Container fluid>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }} />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }} />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {

                if (!user)
                  return (
                    <col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }} />

            <Route path="/directors/:name" render={({ match, history }) => {

              if (!user) return <col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </col>
              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) => {

              if (!user) return <col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </col>
              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user)
                  return <Redirect to="/" />
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }} />

            <Route
              path={`/user-update/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />
                return (
                  <Col>
                    <UserUpdate
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }} />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find((m) => m.Director.Name === match.params.name)
                          .Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }} />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }} />

          </Row>
        </Container>
      </Router>

    );

  }

}

export default MainView; // Only one item can be exported using the default keyword

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};