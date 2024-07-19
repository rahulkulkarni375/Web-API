const { ApolloServer } = require("apollo-server");
const express = require('express')
const app = express();
const cors = require('cors')
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");


const server = new ApolloServer({ 
        typeDefs, 
        resolvers 
});

server.listen().then(({url})=>{
        console.log(`Server is running at ${url}`);
})
