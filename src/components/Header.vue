<template>
  <div>
    <SignInModal>
      <label>Email Id:*</label>
      <input type="email" />
      <label>Password:*</label>
      <input type="password" />
      <button v-on:click="Login">Sign In</button>
    </SignInModal>
    <SignUpModal>
      <label>Email Id:*</label>
      <input type="email" />
      <br />
      <label>Mobile Number:*</label>
      <input type="tel" />
      <br />
      <label>Gender:*</label>
      <input type="email" />
      <br />
      <label>Password:*</label>
      <input type="password" />
      <br />
      <label>Confirm Password:*</label>
      <input type="password" />
      <br />
      <button v-on:click=registerUser>Sign Up</button>
    </SignUpModal>
    <v-toolbar dark>
      <v-toolbar-title>Logo Image</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-on:click="openModal('modal-center-signin')">Sign In</v-btn>
        <v-btn v-on:click="openModal('modal-center-signup')">Sign Up</v-btn>
        <v-btn flat>
          <v-icon>local_grocery_store</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      userPayload: {
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        mobileNumber: ""
      },
    };
  },
  apollo:{
    
  },
  methods: {
    openModal: function(idProp) {
      console.log("triggered");
      this.$bvModal.show(idProp);
    },

    login: function() {

    },

    registerUser: function() {
      this.$apollo.mutate({
        mutation: gql `mutation($emailId: String,$password: String,$confirmPassword: String,$mobileNumber: Number,$gender: String){
          addUser(email:$emailId,password: $password,confirmPassword: $confirmPassword,mobileNumber:$mobileNumber,gender: $gender){
            email,
            gender,
            mobileNumber
          }
        }`,
        variables:{
          emailId: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          mobileNumber: this.mobileNumber,
          gender: this.gender
        }
      }).then((data)=>{
        console.log('successfully added user',data);
      },(err)=>{
        console.log('error',err);
      })
    }
  }
};
</script>

<style>
</style>
