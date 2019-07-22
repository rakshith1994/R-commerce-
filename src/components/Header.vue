<template>
  <div>
    <SignInModal>
      <label>Email Id:*</label>
      <input type="email"/>
      <label>Password:*</label>
      <input type="password"/>
       <button>Sign In</button> 
    </SignInModal>
    <SignUpModal>
      <label>Email Id:*</label>
      <input type="email"/><br/>
      <label>Mobile Number:*</label>
      <input type="tel"/><br/>
      <label>Gender:*</label>
      <input type="email"/><br/>
      <label>Password:*</label>
      <input type="password"/><br/>
      <label>Confirm Password:*</label>
      <input type="password"/><br/>
      <button slot="btn" id="main-btn">Sign Up</button> 
    </SignUpModal>
    <v-toolbar dark>
      <v-toolbar-title>Logo Image</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-on:click="openModal('modal-center-signin')">Sign In</v-btn>
          <v-btn v-on:click="openModal('modal-center-signup')">Sign Up</v-btn>
        <v-btn flat><v-icon>local_grocery_store</v-icon></v-btn>
      </v-toolbar-items>
   </v-toolbar>
  </div>
</template>

<script>
export default {
    data(){
        return {
         
        }
    },
    methods:{
      openModal: function(idProp){
        console.log('triggered')
        this.$bvModal.show(idProp);
      }
    }
}
</script>

<style>
#main-btn{
text-align: center
}
</style>
