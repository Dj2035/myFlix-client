import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

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
      user: null,
      favoriteMovies: [],
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

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://jude-movie-api.herokuapp.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${user} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://jude-movie-api.herokuapp.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${user} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user, favoriteMovies } = this.state; //ES6 feature for const movies = this.state.movies

    return (
      <Router>
        <Menubar user={user} />
        <Container fluid>
          <Row className="main-view-width mx-auto justify-content-md-center mt-3">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={user => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return movies.map(m => (
                  <MovieCard key={m._id} movie={m} >
                    {m.title}
                  </MovieCard>
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
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                    isFavorite={favoriteMovies.includes(match.params.movieId)}
                    onBackClick={history.goBack}
                    handleFavorite={this.handleFavorite}
                  />
                );
              }} />

            <Route path="/directors/:directorName" render={({ match, history }) => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.directorName).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:genreName" render={({ match, history }) => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.genreName).Genre} onBackClick={() => history.goBack()} />
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
                      onBackClick={history.goBack}
                      favoriteMovies={favoriteMovies}
                      handleFavorite={this.handleFavorite}
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
                    <UpdateUser
                      user={user}
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