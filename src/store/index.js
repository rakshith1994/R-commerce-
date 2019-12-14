import Vue from 'vue';
import Vuex from 'vuex'
import user from './user';
import {apolloClient} from '../main'
import router from '../router/router'
import gql from 'graphql-tag'
import {GET_USERS , SIGNIN_USER , SIGNUP_USER, GET_CURRENT_USERS , IS_VALID_USERNAME} from '../services/queries'
Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        users : [],
        loading : false,
        signUpUser : [],
        token : '',
        signinUser : [],
        isUserLoggedIn : false,
        userNameAvailable : "",
        error : null,
        setAuthError : null
    },
    mutations : {
        /**
         * store mutation.
         * @param {*} state value  
         * @param {*} payload data
         */
        //signin user with token.
        listUsers : (state,payload) => state.token = payload,

        //isUserLoggedIn boolean value.
        userLoggedIn : (state,payload) => state.isUserLoggedIn = payload,

        // LoggedIn user data
        signinUsers : (state,payload) => state.users = payload,

        //Register user datat
        signupUsers : (state,payload) =>  state.users = payload,

        //username availabe 
        userNameAvailable : (state,payload) => state.userNameAvailable = payload,

        //use on logout.
        clearUser : (status,payload) => status.users = payload,

        setError : (state,payload) => state.error = payload,

        clearError : (state,payload) => state.error = payload,

        setLoading : (state,payload) => state.loading = payload,

        setAuthError : (state,payload) => state.setAuthError = payload

    },
    getters : {
        users : state => state.users,
        isUserLoggedIn : state => state.isUserLoggedIn,
        error : state => state.error,
        loading : state => state.loading,
        setAuthError : state => state.setAuthError
    },
    actions : {

        /**
         * getCurrentUser action returns the current user against the current login user with token.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        getCurrentUser : (context) => {
            return new Promise((resolve,reject) => {
                apolloClient.query({
                    query : GET_CURRENT_USERS
                }).then(result => {
                    console.log('result in GET_CURRENT_USERS for users>>>>>>',result,context);
                    context.commit('signinUsers',result.data.getCurrentUser);
                    resolve(result);
                }).catch(err => {
                    reject(err);
                    throw new Error(err);
                })
            })
        },
        /**
         * getUsers action for user collection from server.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        getUsers: (context) =>{
            new Promise((resolve,reject) => {
                apolloClient.query({
                    query : GET_USERS
                }).then((result)=>{
                    console.log('result in GET_USERS for users>>>>>>',result);
                    context.commit('listUsers',result.getUsers);
                    resolve(result);
                }).catch((error) =>{
                    reject(error);
                    throw new Error(error);
                })
            })
        },
        /**
         *
         * handleLogin action for user login.
         * @param {*} {context} for saving the data back to vuex state.
         * @param {*} {commit} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        handleLogin : (context,payload) => {
            return new Promise((resolve,reject) => {
                context.commit('setLoading',true);  
                context.commit('clearError',null);
                localStorage.setItem('token','');
                apolloClient.mutate({
                    mutation : SIGNIN_USER,
                    variables : payload
                    }).then(result => {
                        context.commit('setLoading',false);
                        localStorage.setItem('token',result.data.signinUser.token);
                        console.log('result in handleLogin for users>>>>>>',result);
                        // context.state.isUserLoggedIn = true;
                        context.commit('listUsers',result.data.getUsers);
                        context.commit('userLoggedIn',true);
                        router.go(); 
                        resolve(result);
                    }).catch( error => {
                        context.commit('setLoading',false);
                        reject(error);
                        context.commit('setError',error);
                        throw new Error(error)
                    })
            })
        },
        /**
         *
         * handleRegistration action for new user account.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         * @param {*} payload is required for the mutation (i.e body) as variable.
         */
        handleRegistration: (context,payload) => {
            return new Promise((resolve,reject) => {
                context.commit('setLoading',true);
                context.commit('clearError',null);
                apolloClient.mutate({
                    mutation : SIGNUP_USER,
                    variables : payload
                }).then((result) => {
                    context.commit('setLoading',false);
                    console.log('result in register user>>>>>>>',result);
                    localStorage.setItem('token',result.data.addUser.token);
                    context.commit('signupUsers',result.data.addUser);
                    context.commit('userLoggedIn',true);
                    router.go(); 
                    resolve(result);
                }).catch((error) => {
                    context.commit('setLoading',false);
                    reject(error);
                    context.commit('setError',error);
                    throw new Error(error)
                })
            })
        },


        /**
         * get the valid UserName from database.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         * @param {*} payload for graphql 
         */
        getUserNameAvailable: (context,payload) => {
            return new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
                apolloClient.mutate({
                    mutation : IS_VALID_USERNAME,
                    variables : payload
                }).then((result) => {
                    context.commit('SET_LOADING_STATUS','notLoading');
                    context.commit('userNameAvailable',true);
                    resolve(result);
                }).catch((err) => reject(err))
            })
        },

        /**
         * logout function.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         * @param {*} payload
         */
        handleLogout : (context,payload) => {
            context.commit('clearUser',null);
            localStorage.setItem('token','');
            apolloClient.resetStore();
        }
    }
    // modules:{
    //     user
    // }
})