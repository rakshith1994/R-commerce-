import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/dashboard/Home.vue'
import ViewProducts from '../components/PLP/ViewProducts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:id', name: 'ViewProducts', component: ViewProducts,props:true },
  ]
})
