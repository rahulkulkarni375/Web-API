import React, { useState } from 'react'

export default function Display(props) {
  const [users , setUsers] = useState(props.userList);

  return (
    <>
    <h2>List of users </h2>
      {users.map(user => 
        <>
            <p key={user.id}><p>{user.name}{" "}{user.username}</p></p>
        </>
      )}
    </>
  )
}
