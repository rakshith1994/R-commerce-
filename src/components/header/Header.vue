<template>
  <div>
    <SignInModal @userCredentialReset = "isLoggedIn = $event"></SignInModal>
    <SignUpModal>
      <form @submit.prevent = "submitSignUpForm">
        <div class = "input" :class = "{inValid: $v.form.firstName.$error}">
          <label :class = "{error_message: $v.form.firstName.$error}">First Name:*</label>
          <input 
                type="firstName" 
                class="form-control"
                id = "firstName"
                v-model.lazy="form.firstName"
                @blur="$v.form.firstName.$touch()"/>
          <template v-if="$v.form.firstName.$error">
            <span class = "error_message" v-if="!$v.form.firstName.required">First Name must not be empty</span>
          </template>
        </div>
        <br/>
        <div class = "input" :class = "{inValid: $v.form.lastName.$error}">
          <label :class = "{error_message: $v.form.lastName.$error}">Last Name:*</label>
          <input 
                type="lastName" 
                class="form-control"
                id = "lastName"
                v-model.lazy="form.lastName"
                @blur="$v.form.lastName.$touch()"/>
          <template v-if="$v.form.lastName.$error">
            <span class = "error_message" v-if="!$v.form.lastName.required">Last Name must not be empty</span>
          </template>
        </div>
        <br/>
        <div class = "input" :class = "{inValid: $v.form.email.$error}">
          <label :class = "{error_message: $v.form.email.$error}">Email Id:*</label>
          <input 
                type="email" 
                class="form-control"
                id = "email"
                v-model.lazy="form.email"
                @blur="$v.form.email.$touch()"/>
          <template v-if="$v.form.email.$error">
            <span class = "error_message" v-if="!$v.form.email.email">Please provide the valid email address.</span>
            <span class = "error_message" v-if="!$v.form.email.required">Email must not be empty</span>
          </template>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.form.phoneNumber.$error}">
          <label :class = "{error_message: $v.form.phoneNumber.$error}">Mobile Number:*</label>
          <input 
                type="tel" 
                class="form-control"
                id = "phoneNumber"
                v-model.number="form.phoneNumber"
                @blur="$v.form.phoneNumber.$touch()"/>
          <template v-if="$v.form.phoneNumber.$error">
            <span class = "error_message"  v-if="!$v.form.phoneNumber.required">phone Number must not be empty</span>
            <span class = "error_message"  v-if="!$v.form.phoneNumber.minLength">phoneNumber must be number with atleast {{$v.phoneNumber.$params.minLength.min}} digit.</span>
          </template>
        </div>
        <br />
        <div class = "input">
          <label>Gender:</label>
                  <input 
                type="checkbox" 
                id = "male"
                v-model="form.gender"
                value = "Male"
                /><label for="john">Male</label>
          <input 
                type="checkbox" 
                id = "female"
                v-model="form.gender"
                value = "Female"
                /><label for="john">Female</label>
          </div>
        <br />
          <div class = "input" :class = "{inValid : $v.form.password.$error}">
          <label :class = "{error_message: $v.form.password.$error}">Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "password"
                v-model.lazy="form.password"
                @blur="$v.form.password.$touch()"/>
          <template v-if="$v.form.password.$error">
            <span class = "error_message"  v-if="!$v.form.password.required">Password must not be empty</span>
            <span class = "error_message"  v-if="!$v.form.password.minLength">password length must be atleast {{$v.password.$params.minLength.min}}</span>
          </template>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.form.confirmPassword.$error}">
          <label :class = "{error_message: $v.form.confirmPassword.$error}">Confirm Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "confirmPassword"
                v-model.lazy="form.confirmPassword"
                @blur="$v.form.confirmPassword.$touch()"/>
          <template v-if="$v.form.confirmPassword.$error">
            <span class = "error_message"  v-if="!$v.form.confirmPassword.required">Confirm Password must not be empty</span>
            <span class = "error_message"  v-if="!$v.form.confirmPassword.sameAs">entered password should match.</span>
          </template>
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
          <v-btn v-if = !isLoggedIn v-on:click="openModal('modal-center-signin')">Sign In</v-btn>
          <v-btn v-if = !isLoggedIn v-on:click="openModal('modal-center-signup')">Sign Up</v-btn>
          <v-btn flat>
            <v-icon>local_grocery_store</v-icon>
          </v-btn>
          <div class = "loginUser" v-if = isLoggedIn>
               <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
          </div>
        </v-toolbar-items>
      </div>
    </v-toolbar>
      <div class = "hidden-xs-only megaMenu">
        <ul>
          <template v-for="(item, index) in megaMenuData" >
            <li :key="index" @mouseover = "handleMouseOver" @mouseleave = "handleMouseLeave">
                <router-link :to = item.route >{{item.title}}</router-link>
                <div :class = "{'isMegaMenuActive' : isMegaMenuActive}">
                  <div v-show="isMegaMenuActive">
                    <ul>
                      <li>sdsdsdsdsd</li>
                    </ul>
                  </div>
                </div>
            </li>
          </template>
        </ul>
      </div>
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
  props :['isActive'],
  data() {
    return {
      form : {
        firstName : "",
        lastName : "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: [],
        confirmPassword: ""
      },
      megaMenuData : [
        {title : 'Mens',route : 'mens'},
        {title : 'Womens',route : 'womens'},
        {title : 'Kids',route : 'kids'}
        ],
      isSubmitted : false,
      multiLine: true,
      snackbar: false,
      isLoggedIn : false,
      isMegaMenuActive : false
    };
  },
  validations: {
    form : {
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
    }
  },
  components : {
    "SignInModel" : signin,
    "sideBar" : sideBar,
  },
  methods: {
    openModal: function(idProp) {
      this.$bvModal.show(idProp);
    },
    resetForm() { 
        var self = this
        Object.keys(this.form).forEach(function(key,index) {
            self.form[key] = '';
        });
    },
    handleMouseOver() { 
      this.isMegaMenuActive = true;
    },
    handleMouseLeave() {
      this.isMegaMenuActive = false;
    },
    submitSignUpForm() {
      this.isSubmitted = true;
      if (!this.$v.$invalid) {
        this.isLoggedIn = true;
        const user = {
          email: this.form.email,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          password: this.form.password,
          repeatPassword: this.form.repeatPassword
        }
        this.snackbar = true;
        this.resetForm();
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
