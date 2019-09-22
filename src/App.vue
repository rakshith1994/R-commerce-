<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {apolloClient} from './main'
export default {
  name: 'App',
  mounted(){
    console.log('apolloClient in app>>>>>>>>>',apolloClient);
  }
}
</script>
<style>
</style>
