import gql from 'graphql-tag';

/**
 * GET_USERS query for user collection.
 */
export const GET_USERS = gql`
    query{
        getUsers{
            username,
            email,
            dob,
            gender
        }
    }
`
/**
 * GET_CURRENT_USERS query for loggedIn User data.
 */
export const GET_CURRENT_USERS = gql`
    query{
        getCurrentUser{
            userName,
            email,
            dob,
            gender
        }
    }
`

/**
 * SIGIN_USER mutation for user login.
 */
export const SIGNIN_USER = gql`
    mutation($email:String!,$password:String!){
        signinUser(email: $email,password: $password){
            token
        }
    }
`

export const IS_VALID_USERNAME = gql`
    mutation($userName:String!){
        checkValidUserName(userName: $userName){
            userName
        }
    }
`

/**
 * SIGNUP_USER for register new user.
 */
export const SIGNUP_USER = gql`
    mutation($userName:String!,$password:String!,$email: String!,$dob: String!,$gender: String!){
        addUser(userName: $userName,password: $password,email: $email,dob: $dob,gender: $gender){
            token
        }
    }
`