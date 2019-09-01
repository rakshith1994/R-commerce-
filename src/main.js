// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import Vuetify from 'vuetify'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
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

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
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
  components: { App },
  template: '<App/>'
})
/* eslint-disable no-new */
