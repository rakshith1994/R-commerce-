<template>
  <div>
    <SignInModal>
      <label>Email Id:*</label>
      <input name="email" class="form-control" type="email" />
      <br />
      <label>Password:*</label>
      <input name="password" class="form-control" type="password" />
      <hr/>
      <button class = "btn btn-primary">Sign In</button>
    </SignInModal>
    <SignUpModal>
      <form @submit.prevent = "submitSignUpForm">
        <div class = "input" :class = "{inValid: $v.email.$error}">
          <span :class = "{inValid: $v.email.$error}">Email Id:*</span>
          <input 
                type="email" 
                class="form-control"
                id = "email"
                v-model="email"
                @blur="$v.email.$touch()"/>
          <span v-if="!$v.email.email">Please provide the valid email address.</span>
          <span v-if="!$v.email.required">email is required</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.phoneNumber.$error}">
          <label>Mobile Number:*</label>
          <input 
                type="tel" 
                class="form-control"
                id = "phoneNumber"
                v-model="phoneNumber"
                @blur="$v.phoneNumber.$touch()"/>
          <span v-if="!$v.phoneNumber.required">phoneNumber is required</span>
          <span v-if="!$v.phoneNumber.minLength">phoneNumber must be atleast {{$v.phoneNumber.$params.minLength.min}} digit.</span>
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
          <label>Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "password"
                v-model="password"
                @blur="$v.password.$touch()"/>
          <span v-if="!$v.password.required">password is required</span>
          <span v-if="!$v.password.minLength">password length must be atleast {{$v.password.$params.minLength.min}}</span>
        </div>
        <br />
        <div class = "input" :class = "{inValid : $v.confirmPassword.$error}">
          <label>Confirm Password:*</label>
          <input 
                type="password" 
                class="form-control"
                id = "confirmPassword"
                v-model="confirmPassword"
                @blur="$v.confirmPassword.$touch()"/>
          <span v-if="!$v.confirmPassword.required">confirm Password is required</span>
          <span v-if="!$v.confirmPassword.sameAs">entered password should match.</span>
        </div>
        <hr/>
        <button class = "btn btn-primary" slot="btn" id="main-btn">Sign Up</button>
        <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
          >
          Hola! SignUp SuccessFull.
            <v-btn
              color="red"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
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
      sameAs: sameAs("password")
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
        this.snackbar = true;
      }else{
        this.$v.$touch();
      }
    }
  }
};
</script>

<style >
  input {
    margin: 10px auto;
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
