// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import Header from './components/header/Header.vue'
import 'vuetify/dist/vuetify.min.css'
import BootStrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SignInModal from './components/auth/SignInModal.vue'
import SignUpModal from './components/auth/SignUpModal'
import Vuelidate from 'vuelidate'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootStrapVue);
Vue.use(Vuetify);
Vue.use(VueApollo);

Vue.component('Header',Header);
Vue.component('SignInModal',SignInModal);
Vue.component('SignUpModal',SignUpModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
