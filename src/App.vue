<template>
  <div>
    <router-view/>
      <v-snackbar v-model="authSnackbar"  color = "green" :timeout= '5000' top>
          <v-icon class = "md-3">check_circle</v-icon>
          <span>Hola! User Registered SuccessFull.</span>
          <v-btn dark flat @click = "authSnackbar = false">close</v-btn>
      </v-snackbar>

      <v-snackbar v-if = "setAuthError" v-model="authErrorSnackbar"  color = "info" :timeout= '5000' top>
          <v-icon class = "md-3">check_circle</v-icon>
          <span>{{setAuthError.message}}</span>
          <v-btn dark flat @click = "authErrorSnackbar = false">close</v-btn>
      </v-snackbar>
  </div>
</template>

<script>
import {apolloClient} from './main'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
    data(){
      return{
        authSnackbar : false,
        authErrorSnackbar : false
      }
    },
    computed: {
      ...mapGetters(['setAuthError','users']),
    },
    watch : {

      users(newValue,oldValue) {
        console.log('outside the watch for snackbar login>>>>>>',newValue,oldValue.length);
        if(newValue){
          console.log('inside the watch for snackbar login>>>>>>',newValue,oldValue);
          this.authSnackbar = true;
        }
      },
      setAuthError(value){
        console.log('error value in setAuthError>>>>>>>>',value,typeof value);
        if(!value == null){
          console.log('inside if error value in setAuthError>>>>>>>>',value,typeof value);
          this.authErrorSnackbar = true;
        }else{
          console.log('inside else error value in setAuthError>>>>>>>>',value,typeof value);

        }
      }
    },
    
    /**
     * getCurrent user aftere token is verified in backend by jwt.
     **/
    beforeCreate() {
      this.$store.dispatch('getCurrentUser')
      .then(result => {
        console.log('result in handling the session for login>>>>>>>',result);
        localStorage.setItem('user',JSON.stringify(result.data.getCurrentUser))
      })
      .catch(error => {
        console.log('in getCurrent error block! here we can set session out logic>>>>>>>>')
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // this.$bvModal.show('modal-center-signin'); 
        this.$emit('showSessionOutSnakbar',true);
        throw new Error(error)
      })
  },
}
</script>
<style> 
</style>
