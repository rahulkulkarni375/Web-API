import React, { useState } from 'react'

export default function Show(props) {
  const [user, setUser] = useState();
  setUser(props.user);
  return (
    <>
    <h4>Searched User</h4>
      <p>{user}</p>
    </>
  )
}
