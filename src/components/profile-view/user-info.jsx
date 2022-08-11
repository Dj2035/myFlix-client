import React from 'react';

function UserInfo({ email, username }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </>
  )
}

export default UserInfo