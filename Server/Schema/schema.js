const mongoose = require('mongoose');
const graphql = require('graphql');
const userModel = require('../Models/user');

const {GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name:"user",
    fields:({
        userName: {type: GraphQLString},
        password : {type: GraphQLString},
        email : {type : GraphQLString},
        gender : {type: GraphQLString},
        confirmPassword : {type: GraphQLString},
        mobileNumber:{type:GraphQLString}
    })
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type: UserType,
            args:{email:{type:GraphQLString},
            password:{type:GraphQLString},
            mobileNumber:{type:GraphQLString},
            gender:{type:GraphQLString},
            confirmPassword:{type:GraphQLString}
             },
            resolve(parent,args){
                let newUser = new userModel({
                    email: args.email,
                    password: args.password,
                    confirmPassword: args.confirmPassword,
                    mobileNumber: args.mobileNumber,
                    gender: args.gender
                });
              return newUser.save();

            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'rootQueries',
    fields:{
        user:{
            type: new GraphQLList(UserType),
            args:{ email:{type:GraphQLString}},
            resolve(parent,args){
               return userModel.find({}); 
            }
        }
    }
});

module .exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})