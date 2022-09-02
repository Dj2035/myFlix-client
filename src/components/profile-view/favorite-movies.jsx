import React from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Figure, Card } from 'react-bootstrap';
import axios from 'axios';

import './profile-view.scss';
import { useSelector } from 'react-redux';

function FavMovies(props) {

  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.FavoriteMovies) || [];
  console.log(favoriteMovies);

  const userFavorites = favoriteMovies.map(function (movie) {
    return movie._id;
  })
  console.log(userFavorites);


  const favoriteMoviesList = movies.filter(({ _id }) => favoriteMovies.includes(_id));
  console.log(favoriteMoviesList);

  const removeFav = (movie) => {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    console.log(`remove fav auth: ${token}`);

    axios.delete(`https://jude-movie-api.herokuapp.com/users/${user}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert(`Movie successfully removed from favorites.`)
        window.open(`/users/${user}`, '_self');
      })
      .catch(error => console.error(error))
  }

  if (userFavorites.length === 0 || !userFavorites) {
    return (<p>You have no favorite movies yet.</p>)
  }
  else if (userFavorites.length !== 0) {
    return favoriteMoviesList.map((movie) => (
      <Col xs={12} md={6} lg={4} xl={3} key={movie._id} className="fav-movie">
        <Figure>
          <Link to={`/movies/${movie._id}`}>
            <Figure.Image
              src={movie.ImagePath}
              alt={movie.Title}
              crossOrigin="anonymous"
            />
            <Figure.Caption>
              {movie.Title}
            </Figure.Caption>
          </Link>
          <Button variant="outline-danger" className="mt-2 ml-auto" style={{ width: '100%' }} onClick={() => removeFav(movie)}>Remove from Favorite</Button>
        </Figure>
      </Col>
    ))
  }
}

export default FavMovies;