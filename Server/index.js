const express = require('express');
const app = express();
const mongoose = require('mongoose');
const graphqlSchema = require('./Schema/schema');
const graphqlHTTP = require('express-graphql');

mongoose.connect('mongodb+srv://rakshith:Abcd!2345@cluster0-qioka.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});

app.use('/graphql',graphqlHTTP({
    schema:graphqlSchema,
    graphiql:true
}));

app.listen(3000);