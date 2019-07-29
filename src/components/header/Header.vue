<template>
  <div>
    <SignInModal>
      <form @submit.prevent = "login">
        <div class = "input" :class = "{inValid: $v.loginEmail.$error}">
          <label >Email Id:*</label>
          <input 
                name="email" 
                class="form-control" 
                type="email"
                v-model="loginEmail"
                @blur="$v.loginEmail.$touch()"
                />
            <span class = "error_message" v-if="!$v.loginEmail.email">Please provide the valid email address.</span>
            <span class = "error_message" v-if="!$v.loginEmail.required">email is required</span>
          </div>
          <br />
          <div class = "input" :class = "{inValid: $v.loginPassword.$error}">
          <label >Password:*</label>
          <input 
                name="password" 
                class="form-control" 
                type="password"
                v-model="loginPassword"
                @blur="$v.loginPassword.$touch()"
                />
          <span class = "error_message"  v-if="!$v.loginPassword.required">password is required</span>
          <span class = "error_message"  v-if="!$v.loginPassword.minLength">password length must be atleast {{$v.loginPassword.$params.minLength.min}}</span>
        </div>
      <hr/>
      <button class = "btn btn-primary">Sign In</button>
      </form>
    </SignInModal>
    <SignUpModal>
      <form @submit.prevent = "submitSignUpForm">
        <div class = "input" :class = "{inValid: $v.email.$error}">
          <label :class = "{error_message: $v.email.$error}">Email Id:*</label>
          <input 
                type="email" 
                class="form-control"
                id = "email"
                v-model="email"
                @blur="$v.email.$touch()"/>
          <span class = "error_message" v-if="!$v.email.email">Please provide the valid email address.</span>
          <span class = "error_message" v-if="!$v.email.required">email is required</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.phoneNumber.$error}">
          <label :class = "{error_message: $v.phoneNumber.$error}">Mobile Number:*</label>
          <input 
                type="tel" 
                class="form-control"
                id = "phoneNumber"
                v-model="phoneNumber"
                @blur="$v.phoneNumber.$touch()"/>
          <span class = "error_message"  v-if="!$v.phoneNumber.required">phoneNumber is required</span>
          <span class = "error_message"  v-if="!$v.phoneNumber.minLength">phoneNumber must be atleast {{$v.phoneNumber.$params.minLength.min}} digit.</span>
        </div>
        <br />
        <div class = "input">
          <label>Gender:</label>
                  <input 
                type="checkbox" 
                id = "gender"
                v-model="gender"
                value = "Male"
                /><label for="john">Male</label>
          <input 
                type="checkbox" 
                id = "gender"
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
                v-model="password"
                @blur="$v.password.$touch()"/>
          <span class = "error_message"  v-if="!$v.password.required">password is required</span>
          <span class = "error_message"  v-if="!$v.password.minLength">password length must be atleast {{$v.password.$params.minLength.min}}</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.confirmPassword.$error}">
          <label :class = "{error_message: $v.confirmPassword.$error}">Confirm Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "confirmPassword"
                v-model="confirmPassword"
                @blur="$v.confirmPassword.$touch()"/>
          <span class = "error_message"  v-if="!$v.confirmPassword.required">confirm Password is required</span>
          <span class = "error_message"  v-if="!$v.confirmPassword.sameAs">entered password should match.</span>
        </div>
        <hr/>
        <button class = "btn btn-primary" slot="btn" id="main-btn">Sign Up</button>
        <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            :timeout= 5000
          >
          Hola! SignUp SuccessFull.
        </v-snackbar>
      </form>
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
import {
  required,
  email,
  sameAs,
  minLength
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      phoneNumber: "",
      gender: [],
      confirmPassword: "",
      isSubmitted : false,
      multiLine: true,
      snackbar: false,
      loginEmail:'',
      loginPassword : ''
    };
  },
  validations: {
    email: {
      required,
      email
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
    },
    loginEmail : {
      required
    },
    loginPassword : {
      required
    }
  },
  methods: {
    openModal: function(idProp) {
      this.$bvModal.show(idProp);
    },
    submitSignUpForm() {
      console.log('$v>>>>>>',this.$v);
      this.isSubmitted = true;
      if (!this.$v.$invalid) {
        // this.$bvModal.hide('modal-center-signup');
        this.snackbar = true;
        this.$v.$reset();
      }else{
        this.$v.$touch();
      }
    },
    login() {
      if (!this.$v.$invalid) {
        // this.$bvModal.hide('modal-center-signup');
        this.snackbar = true;
        this.$v.$reset();
      }else{
          this.$v.$touch();
        }
    }
  }
};
</script>

<style >
  body{
    font-family: monospace
  }
  
  .error_message{
    color : #a94442;
  }
  .input.inValid input {
    border: 1px solid #a94442;
  }
  
  .input.inValid span {
    color: 1px solid #a94442;
  }

  .input.inValid label {
    color: 1px solid #a94442;
  }
  
  .input.inValid label {
    color: 1px solid rgb(255, 0, 0);
  }
  
  #main-btn {
    text-align: center;
  }
</style>
