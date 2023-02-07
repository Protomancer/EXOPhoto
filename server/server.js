const express = require('express');
// Apollo Import 
const { ApolloServer } = require('apollo-server-express');
const path = require ('path');
require('dotenv').config();

// Typedefs and resolvers Import
const { typeDefs, resolvers } = require('./schemas');
const dataBase = require('./config/connection');

// setup port

const PORT = process.env.port || 3001;
const app = express();
const server = new ApolloServer ({
    typeDefs,
    resolvers,
});

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// create new apollo server and give link
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    dataBase.once('open', () => {
        app.listen(PORT, () => {
            console.log(`server for api running on port ${PORT}`);
            console.log(`GraphQl port Located @ http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

//call server start
startApolloServer(typeDefs, resolvers);