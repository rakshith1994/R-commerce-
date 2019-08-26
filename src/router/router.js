import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/dashboard/Home.vue'
import Mens from '../components/listingPages/Men/men.vue'
import Womens from '../components/listingPages/Women/women.vue'
import Kids from '../components/listingPages/Kids/kid.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/mens', name: 'mens', component: Mens },
    { path: '/womens', name: 'womens', component: Womens },
    { path: '/kids', name: 'kids', component: Kids },
  ]
})
