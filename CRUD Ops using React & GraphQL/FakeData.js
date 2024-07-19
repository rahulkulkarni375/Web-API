const userData = [
        {
          id: 1,
          name: "John Doe",
          age: 30,
          username: "johndoe123",
          nationality: "American",
          friends : [
             {  
          id: 2,
          name: "Jane Smith",
          age: 25,
          username: "janesmith456",
          nationality: "British"
        },
          ]
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 25,
          username: "janesmith456",
          nationality: "British",
          friends : [ {
            id: 3,
            name: "Michael Johnson",
            age: 28,
            username: "mikej",
            nationality: "Canadian"
          }]
        },
        {
          id: 3,
          name: "Michael Johnson",
          age: 28,
          username: "mikej",
          nationality: "Canadian",
          friends : [
             {
          id: 2,
          name: "Jane Smith",
          age: 25,
          username: "janesmith456",
          nationality: "British"
        },
          ]
        },
        {
          id: 4,
          name: "Maria Garcia",
          age: 35,
          username: "mariag",
          nationality: "Spanish"
        },
        {
          id: 5,
          name: "Ahmed Khan",
          age: 32,
          username: "ahmedk",
          nationality: "Turkish",
          friends : [
             {
          id: 2,
          name: "Jane Smith",
          age: 25,
          username: "janesmith456",
          nationality: "British"
        },
          ]
        }
]      

const movieData = [
  {
    id: 1,
    name: "The Shawshank Redemption",
    released_year: 1994
  },
  {
    id: 2,
    name: "The Godfather",
    released_year: 1972
  },
  {
    id: 3,
    name: "The Dark Knight",
    released_year: 2008
  },
  {
    id: 4,
    name: "Pulp Fiction",
    released_year: 1994
  },
  {
    id: 5,
    name: "Schindler's List",
    released_year: 1993
  }
]

const sportsData = [
  {
    "id": 1,
    "sport_name": "Football",
    "origin": "England"
  },
  {
    "id": 2,
    "sport_name": "Basketball",
    "origin": "United States"
  },
  {
    "id": 3,
    "sport_name": "Cricket",
    "origin": "England"
  },
  {
    "id": 4,
    "sport_name": "Tennis",
    "origin": "United Kingdom"
  },
  {
    "id": 5,
    "sport_name": "Baseball",
    "origin": "United States"
  }
]

const LoginData = [
  { "username" : "some1", "password" : "1234" },
  { "username" : "get2", "password" : "4321" },
  { "username" : "not1", "password" : "1122" }
];

module.exports = { userData, movieData, sportsData, LoginData };