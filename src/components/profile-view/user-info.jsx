import React from 'react';

function UserInfo(props) {
  const { user } = props;
  return (
    <>
      <h4>Your Info</h4>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
    </>
  )
}

export default UserInfo