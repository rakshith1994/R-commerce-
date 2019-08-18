<template>
  <div>
    <SignInModal></SignInModal>
    <SignUpModal>
      <form @submit.prevent = "submitSignUpForm">
        <div class = "input" :class = "{inValid: $v.firstName.$error}">
          <label :class = "{error_message: $v.firstName.$error}">First Name:*</label>
          <input 
                type="firstName" 
                class="form-control"
                id = "firstName"
                v-model.lazy="firstName"
                @blur="$v.firstName.$touch()"/>
          <span class = "error_message" v-if="!$v.firstName.required">First Name must not be empty</span>
        </div>
        <br/>
        <div class = "input" :class = "{inValid: $v.lastName.$error}">
          <label :class = "{error_message: $v.lastName.$error}">Last Name:*</label>
          <input 
                type="lastName" 
                class="form-control"
                id = "lastName"
                v-model.lazy="lastName"
                @blur="$v.lastName.$touch()"/>
          <span class = "error_message" v-if="!$v.lastName.required">Last Name must not be empty</span>
        </div>
        <br/>
        <div class = "input" :class = "{inValid: $v.email.$error}">
          <label :class = "{error_message: $v.email.$error}">Email Id:*</label>
          <input 
                type="email" 
                class="form-control"
                id = "email"
                v-model.lazy="email"
                @blur="$v.email.$touch()"/>
          <span class = "error_message" v-if="!$v.email.email">Please provide the valid email address.</span>
          <span class = "error_message" v-if="!$v.email.required">Email must not be empty</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.phoneNumber.$error}">
          <label :class = "{error_message: $v.phoneNumber.$error}">Mobile Number:*</label>
          <input 
                type="tel" 
                class="form-control"
                id = "phoneNumber"
                v-model.number="phoneNumber"
                @blur="$v.phoneNumber.$touch()"/>
          <span class = "error_message"  v-if="!$v.phoneNumber.required">phone Number must not be empty</span>
          <span class = "error_message"  v-if="!$v.phoneNumber.minLength">phoneNumber must be number with atleast {{$v.phoneNumber.$params.minLength.min}} digit.</span>
        </div>
        <br />
        <div class = "input">
          <label>Gender:</label>
                  <input 
                type="checkbox" 
                id = "male"
                v-model="gender"
                value = "Male"
                /><label for="john">Male</label>
          <input 
                type="checkbox" 
                id = "female"
                v-model="gender"
                value = "Female"
                /><label for="john">Female</label>
          </div>
        <br />
          <div class = "input" :class = "{inValid : $v.password.$error}">
          <label :class = "{error_message: $v.password.$error}">Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "password"
                v-model.lazy="password"
                @blur="$v.password.$touch()"/>
          <span class = "error_message"  v-if="!$v.password.required">Password must not be empty</span>
          <span class = "error_message"  v-if="!$v.password.minLength">password length must be atleast {{$v.password.$params.minLength.min}}</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.confirmPassword.$error}">
          <label :class = "{error_message: $v.confirmPassword.$error}">Confirm Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "confirmPassword"
                v-model.lazy="confirmPassword"
                @blur="$v.confirmPassword.$touch()"/>
          <span class = "error_message"  v-if="!$v.confirmPassword.required">Confirm Password must not be empty</span>
          <span class = "error_message"  v-if="!$v.confirmPassword.sameAs">entered password should match.</span>
        </div>
        <hr/>
        <button class = "btn btn-primary" slot="btn" id="main-btn" :disabled="$v.$invalid">Sign Up</button>
        <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            :timeout= 5000
          >
          Hola! User Registered SuccessFull.
        </v-snackbar>
      </form>
    </SignUpModal>
    <v-toolbar>
      <sideBar></sideBar>
        <v-spacer></v-spacer>
      <div>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-on:click="openModal('modal-center-signin')">Sign In</v-btn>
          <v-btn v-on:click="openModal('modal-center-signup')">Sign Up</v-btn>
          <v-btn flat>
            <v-icon>local_grocery_store</v-icon>
          </v-btn>
        </v-toolbar-items>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import {
  required,
  email,
  sameAs,
  minLength
} from "vuelidate/lib/validators";
import signin from "../auth/SignInModal"
import sideBar from "../menu/menu"

export default {
  data() {
    return {
      firstName : "",
      lastName : "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: [],
      confirmPassword: "",
      isSubmitted : false,
      multiLine: true,
      snackbar: false,
      loginEmail:'default@gmail.com',
      loginPassword : 'jgjyh'
    };
  },
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    phoneNumber: {
      required,
      minLength: minLength(10)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  components : {
    "SignInModel" : signin,
    "sideBar" : sideBar,
  },
  methods: {
    openModal: function(idProp) {
      this.$bvModal.show(idProp);
      this.$data.email = "";
      this.$data.password = "";
      this.$data.phoneNumber = "";
      this.$data.confirmPassword = "";
      this.$data.lastName = "";
      this.$data.firstName = "";
    },
    submitSignUpForm() {
      this.isSubmitted = true;
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          repeatPassword: this.repeatPassword
        }
        this.snackbar = true;
        // this.$v.$reset();
        console.log('user>>>>>',user);
        // this.$bvModal.hide('modal-center-signup');
      }
    }
  }
};
</script>

<style >
@import "../../css/header.css";
</style>
