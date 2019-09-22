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
        loadingStatus : "notLoading",
        signUpUser : [],
        token : '',
        signinUser : [],
        isUserLoggedIn : false,
        userNameAvailable : ""
    },
    mutations : {
        listUsers : (state,payload) => state.token = payload,
        userLoggedIn : (state,payload) => state.isUserLoggedIn = payload,
        signinUsers : (state,payload) => state.users = payload,
        signupUsers : (state,payload) =>  state.signUpUser = payload,
        userNameAvailable : (state,payload) => state.userNameAvailable = payload,
        SET_LOADING_STATUS :(state,payload) => state.loadingStatus = payload,
        clearUser : (status,payload) => status.users = payload
    },
    getters : {
        users : state => state.users,
        isVerifiedAndLogin : state => state.isUserLoggedIn
    },
    actions : {
        getCurrentUser : (context) => {
            return new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
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
         * @param {*} {commit} for saving the data back to vuex state.
         */
        getUsers: (context) =>{
            new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
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
         * @param {*} {commit} for saving the data back to vuex state.
         * @param {*} payload is required for the mutation (i.e body) as variable.
         */
        handleLogin : (context,payload) => {
            return new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
                localStorage.setItem('token','');
                apolloClient.mutate({
                    mutation : SIGNIN_USER,
                    variables : payload
                    }).then(result => {
                        console.log('result in handleLogin for users>>>>>>',result);
                        // context.state.isUserLoggedIn = true;
                        context.commit('userLoggedIn',true);
                        context.commit('listUsers',result.data.getUsers);
                        localStorage.setItem('token',result.data.signinUser.token);
                        // router.go();
                        resolve(result);
                    }).catch( error => {
                        reject(error);
                        throw new Error(error)
                    })
            })
        },
        /**
         *
         * handleRegistration action for new user account.
         * @param {*} {commit} for saving the data back to vuex state.
         * @param {*} payload is required for the mutation (i.e body) as variable.
         */
        handleRegistration: ({commit},payload) => {
            return new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
                apolloClient.mutate({
                    mutation : SIGNUP_USER,
                    variables : payload
                }).then((result) => {
                    console.log('result in handleRegistration',result);
                    commit('signupUsers',result.data.getUsers)
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                    throw new Error(error)
                })
            })
        },
        getUserNameAvailable: (context,payload) => {
            return new Promise((resolve,reject) => {
                context.commit('SET_LOADING_STATUS','loading');
                apolloClient.mutate({
                    mutation : IS_VALID_USERNAME,
                    variables : payload
                }).then((result) => {
                    context.commit('');
                    resolve(result);
                }).catch((err) => reject(err))
            })
        },
        handleLogout : (context,payload) => {
            context.commit('clearUsers',null);
            localStorage.setItem('token','');
            apolloClient.resetStore();
        }
    }
    // modules:{
    //     user
    // }
})