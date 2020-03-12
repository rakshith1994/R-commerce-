<template>
  <v-layout
    wrap
    
  >
    <v-container>
      <v-layout justify-center>
        <v-btn
          flat
          
          @click.stop="drawer = !drawer"
        >
          Cart
        </v-btn>
      </v-layout>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      height =900px
      class = "drawer-component"
      right
    >

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title> {{item.price.inr}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
      }
    },
    mounted(){
      this.$store.subscribe((mutation,state)=>{
        
      })
    }
    }
</script>

<style scoped>

</style>