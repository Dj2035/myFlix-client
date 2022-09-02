import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Form, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

class UserUpdate extends React.Component {
  constructor() {
    super()

    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }


  //Added setUser action to retrieve user details for update form - added connect at end of code.

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://jude-movie-api.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUser({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }


  handleUpdate = (e) => {
    e.preventDefault();

    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://jude-movie-api.herokuapp.com/users/${Username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        this.props.setUser({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday
        });

        localStorage.setItem('user', this.state.Username);
        alert('Profile updated.');
      })
      .catch(function (error) {
        console.log(error);
        alert('Unable to update.');
      });

  };

  setUsername(value) {
    this.setState({
      Username: ''
    });
  }

  setPassword(value) {
    this.setState({
      Password: ''
    });
  }

  setEmail(value) {
    this.setState({
      Email: ''
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: ''
    });
  }

  getBirthdayValue = () => {
    if (this.state.Birthday) return this.state.Birthday.split('T')[0]
    return ''
  };


  render() {

    const { Username, Email, Birthday, Password } = this.props;

    return (
      <>
        <Card.Header as="h5">Want to change some info?</Card.Header>

        <br />
        <Form className='profile-form' onSubmit={(e) => { this.handleUpdate(e) }}>
          <Form.Group controlId='formUsername' className='reg-form-inputs mb-3'>
            <Form.Label>
              Username:
            </Form.Label>
            <Form.Control type="text" placeholder='Enter a new username' defaultValue={Username} onChange={(e) => this.setUsername(e.target.value || '')} />
          </Form.Group>

          <Form.Group controlId='Email' className='reg-form-inputs mb-3'>
            <Form.Label>
              Email:
            </Form.Label>
            <Form.Control type="email" placeholder='Email' defaultValue={Email} onChange={(e) => this.setEmail(e.target.value || '')} />
          </Form.Group>

          <Form.Group controlId='Password' className='reg-form-inputs mb-3'>
            <Form.Label>
              Password:
            </Form.Label>
            <Form.Control type="password" placeholder='Password' defaultValue={Password} onChange={(e) => this.setPassword(e.target.value || '')} />
          </Form.Group>

          <Form.Group controlId='updateBirthday'>
            <Form.Label>
              Birthday:
            </Form.Label>
            <Form.Control type="date" placeholder='Enter birthday' name='birthday' value={this.getBirthdayValue()} onChange={(e) => this.setBirthday(e.target.value || '')} />
          </Form.Group>

          <Button className='update-button mt-4' variant='primary' type='submit' onClick={(e) => { this.handleUpdate(e) }} >
            Update Profile
          </Button>

        </Form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { setUser })(UserUpdate);