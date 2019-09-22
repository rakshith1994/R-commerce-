// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import Vuetify from 'vuetify'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
// import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Header from './components/header/Header.vue'
import 'vuetify/dist/vuetify.min.css'
import BootStrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SignInModal from './components/auth/SignInModal.vue'
import SignUpModal from './components/auth/SignUpModal'
import Vuelidate from 'vuelidate'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import Footer from "./components/footer/footer.vue"
import store from './store/index'
import { setContext } from 'apollo-link-context'

// HTTP connection to the API
export const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

/**
 * request operation for setting the request header to server to get the current user.
 * @param {*} headers to user to set the headers for the server.
 */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  if(!token){
    localStorage.setItem('token','');
  }
  /**
  * check wether the item in localStorage is present or not, if not do it explicitly.
  * return the headers to the context so httpLink can read them
  */
  return {
    headers: {
      // ...headers,
      Authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache,
  onError : ({graphQlErrors, networkError}) => {
    if(networkError){
      throw new Error(networkError)
    }

    if(graphQlErrors){
      for(let error of graphQlErrors){
        throw new Error(err);
      }
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootStrapVue);
Vue.use(VueApollo);
Vue.use(Vuetify);
Vue.use(Vuesax)

Vue.component('Header',Header);
Vue.component('Footer',Footer);
Vue.component('SignInModal',SignInModal);
Vue.component('SignUpModal',SignUpModal);

new Vue({
  el: '#app',
  router,
  apolloProvider,
  store,
  components: { App },
  created() {
    this.$store.dispatch('getCurrentUser')
    .then(result => {
      console.log('result in handling the session for login>>>>>>>',result);
    }).catch(error => {
      // this.$emit('sessionOut',true);
      localStorage.setItem('token','');
      this.$bvModal.show('modal-center-signin');
      console.log('error in handling the session>>>>>>>',error);
    })
  },
  template: '<App/>'
})
/* eslint-disable no-new */
