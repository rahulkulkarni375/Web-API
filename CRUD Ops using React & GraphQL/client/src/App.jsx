import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import Display from "./Display";
import { useState } from "react";
import { every, functionsIn } from 'lodash';

function App() {
  const [searchingUser, setSearchingUser] = useState("");
  const [updateUser, setUpdateUser] = useState({
    id : "",
    username : ""
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    age: 0,
    nationality: ""
  });
  const [credentials, setCredentials] = useState({
    username : "",
    password : ""
  })

  //Works
  const GET_ALL_USERS = gql`
    query GetAll {
      users {
        id
        name
        username
      }
    }
  `;
  //Works
  const GET_USER = gql`
    query User($userId: ID!) {
      user(id: $userId) {
        id
        name
        username
        friends {
          id
          name
        }
      }
    }
  `;

    //Works
  const CREATE_USER = gql`
    mutation CreateUser($createUserInput: newUser!) {
      createUser(input: $createUserInput) {
        name
        username
        age
        nationality
      }
    }
  `;
//Works
const USER_UPDATE = gql`
    mutation($input: updateNewUsername!){
      updateUserName(input: $input) {
        id
        username
    }
  }
`;


  //These are for Queries and mutations 
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [fetchUser, { data: userData, error: userError }] = useLazyQuery(GET_USER);
  const [createUserInput, { data: createUserData, loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER);
  const [updateUserMutation, { loading: updateUserLoading, error: updateUserError }] = useMutation(USER_UPDATE);

  // console.log("updateUserData ",updateUserData);
  console.log("updateUserLoading ",updateUserLoading);
  console.log("updateUserError ",updateUserError);
  function handleChange(event) {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  }
  
  function handleUpdate(event) {
    setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
  }

  const handleUpdateClick = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          input : {                         //The variables like name,username,age etc.. 
            id: updateUser.id,              // it should match with variables in the mutations
            newUsername: updateUser.username          
          }
        }
      });
      console.log("User updated successfully!", data);
      // Optionally update local state or handle success message
    } catch (error) {
      console.error("Error updating user", error);
      // Handle error state
      if (error) {
        console.error("GraphQL Error:", error.message);
        // Additional error handling for ApolloError
      } else {
        console.error("Network Error:", error.message);
        // Additional error handling for other types of errors
      }
    }
  };
  
  const handleChangeCreds = (event) => {
    setCredentials({...credentials, [event.target.name] : event.target.value})
  }

  const handleSubmit = () => {
    console.log("User credentials ",credentials);
  }
  return (
    <>

     <h2>Login page </h2>
     <input type="text" name="username" value={credentials.username} onChange={(event) => handleChangeCreds(event)}/> <br /> 
     <input type="text" name="password" value={credentials.password} onChange={(event) => handleChangeCreds(event)}/> <br />
     <button onClick={handleSubmit}>Login</button>

       {/* Updating a user */}
       <h2>Updating username</h2>
      <input type="text" name="id" value={updateUser.id} onChange={(event)=>{handleUpdate(event)}} placeholder="id" /> <br /> 
      <input type="text" name="username" value={updateUser.username} onChange={(event)=>{handleUpdate(event)}} placeholder="username" /> <br /> <br />
      <button onClick={handleUpdateClick}>Update !</button>

      {/* Creating a new user */}
   
      <div>
        <h2>Creating a new user </h2> <br />
        <input type="text" name="name" placeholder="Enter name" onChange={(event) => handleChange(event)} /> {" "}
        <input type="text" name="username" placeholder="Enter username" onChange={(event) => handleChange(event)} /> <br /> <br />
        <input type="number" name="age" placeholder="Enter age" onChange={(event) => handleChange(event)} /> {" "}
        <input type="text" name="nationality" placeholder="Enter nationality" onChange={(event) => handleChange(event)} />
        <br /> <br />
        <button onClick={() => {
          createUserInput({
            variables: {
              createUserInput: {                      //The variables like name,username,age etc.. 
                name: userDetails.name,               // it should match with variables in the mutations
                username: userDetails.username,
                age: Number(userDetails.age),
                nationality: userDetails.nationality
              }
            }
          })
        }}>Create</button>
      </div>


        {/* Getting user list */}
      {data ? <Display userList={data.users} /> : <h4>No data available</h4>}

        {/* Searching a particular user  */}
        <h2>Searching a user</h2> 
      <input type="number" value={searchingUser} onChange={(event) => setSearchingUser(event.target.value)} placeholder="Enter user ID" />
      <br /><br />
      <button onClick={() => { fetchUser({ variables: { userId: searchingUser } }) }}>Search</button>
      {userData && <div>
        <b>User Info</b>
        <p>Id : {userData.user.id}</p>
        <p>Name : {userData.user.name}</p>
        <p>Username : {userData.user.username}</p>
        {userData.user.friends !== null ? "Have friends" : "NO Friends"}
      </div>}
      {createUserLoading && <p>Creating user...</p>}
      {createUserError && <p>Error creating user: {createUserError.message}</p>}

     

    </>
  );
}

export default App;


