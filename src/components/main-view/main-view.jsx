import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
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

  //'GETs' movies from database (link to app), adds authorization so no one can simply enter endpoints
  //Have an account to see app
  getMovies(token) {
    axios.get('https://jude-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.props.setMovies(response.data);
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    let { movies } = this.props;
    const { user } = this.state; //ES6 feature for const movies = this.state.movies


    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view-width mx-auto justify-content-md-center mt-3">
          <Route exact path="/" render={() => {
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

            return <MoviesList movies={movies} key={movies._id} />;
          }} />

          <Route exact path="/login" render={() => {
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
              <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            );
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
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
                onBackClick={history.goBack}
                user={user}
              />
            );
          }} />

          <Route path="/directors/:directorName" render={({ match, history }) => {

            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <DirectorView
                director={movies.find(m => m.Director.Name === match.params.directorName).Director}
                directorMovies={movies.filter(m => m.Director.Name === match.params.directorName)}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }} />

          <Route path="/genres/:genreName" render={({ match, history }) => {

            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.genreName).Genre}
                genreMovies={movies.filter((m) => m.Genre.Name === match.params.genreName)}
                onBackClick={() => history.goBack()}
              />
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
                    onBackClick={history.goBack}
                  />
                </Col>
              );
            }} />

        </Row>
      </Router>

    );

  }

}

let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect(mapStateToProps, { setMovies })(MainView);