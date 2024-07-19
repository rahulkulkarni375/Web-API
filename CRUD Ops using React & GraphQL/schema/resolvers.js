const { userData, movieData, sportsData, LoginData } = require("../FakeData");
const _ = require("lodash");

const resolvers = {

    // This is like declaring a function
    Query: {
        users : () => {
            return userData;
        },

        loginUser: () => {
            return LoginData;
        },
         
        user : (parent , args) => {
            const userId = Number(args.id);
            const user = _.find(userData , {  id : userId })
            return user;
        },
        
        movies: () => {
            return movieData;
        },

        movie: (parent, args) => {
            const movieName = args.name;
            const movie = _.find(movieData , {name : movieName})
            return movie;
        },

        sports: () => {
            return sportsData;
        }
    },

    // We need to write query separately when you want to fetch different data set 
    // Here the userData is fetching from  movieData
    User :{
        favoriteMovies : () => {
            return _.filter(movieData, (movie) => movie.released_year >= 1990 && movie.released_year <= 1995)
        },

        favSport: () => {
            return _.filter(sportsData, (sport) => sport.sport_name === "Cricket")
        }
        
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            console.log("New User ",user);
            const lastId = userData[userData.length - 1].id;
            user.id = lastId + 1;
            userData.push(user);
            console.log("user created ",user);
            return user;
        },
 
        updateUserName: (parent, args) => {
            const {id, newUsername} = args.input;
            // console.log(typeof id); // id type : strings
            let userUpdated;
            userData.forEach((user)=> {
                // console.log("uid ",typeof user.id); // uid type number
                if(user.id == id) {
                    user.username = newUsername;
                    userUpdated = user;
                }
            })
            console.log("updated user ",userUpdated);
            return userUpdated;
        },
        deleteUser: (parent , args) => {
            const id = Number(args.id);
            _.remove(userData, (user) => user.id == id);
            console.log("delid ",id);
            return null;
        },
    }

}

module.exports = { resolvers };             