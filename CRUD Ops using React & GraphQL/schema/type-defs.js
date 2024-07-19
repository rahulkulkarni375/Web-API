const {gql} = require("apollo-server");

const typeDefs = gql`
 type User {
        id: ID!,
        name: String!,
        username: String!,
        age: Int!,
        nationality: Nationality!,
        friends: [User],
        favoriteMovies: [Movie],
        favSport: [Sport]
  }
  type LoginUser {
    username: String!,
    password: String!  
  }

  type Movie {
      id: ID!,
      name: String!,
      releasedYear: Int!
  }

  type Sport {
    id: ID!,
    sport_name: String!,
    origin: String!
  }

# Enum are used for predefined set of values like nationality in type User
  enum Nationality {
      American,
      British,
      Canadian,
      Spanish,
      Turkish,
      Africa
  }

  # This is like a type definitions & we can declare the function in resolvers.
  # But Query acts as GET
  type Query {
        users: [User!]!   # Here it return type User array 
        user(id: ID!): User
        movies: [Movie!]!
        movie(name: String!): Movie
        sports: [Sport!]!
        loginUser: [LoginUser!]!
  }

  # Mutation acts as POST, PUT and DELETE
  type Mutation{
    createUser(input: newUser!) : User!
    updateUserName(input: updateNewUsername!) : User!
    deleteUser(id:ID!) : User
    userCredentials(input: credentials!) : LoginUser!

  }

  input credentials{
    username: String!,
    password: String!
  }

  
  input upCredentials{
    username: String!,
    password: String!
  }

  # To create a user of type name username age and nationality (if not given nationality by default canadian)
  input newUser{
    name: String!,
    username: String!,
    age: Int!,
    nationality: Nationality = Canadian
  }

  # To update username by id and newUsername field is given to set new username
  input updateNewUsername{
    iduser: ID!,
    newUsername: String!
  }

`;

  module.exports = { typeDefs }; 

