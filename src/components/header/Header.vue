<template>
  <div>
    <SignInModal>
      <label>Email Id:*</label>
      <input name="email" type="email" />
      <br />
      <label>Password:*</label>
      <input name="password" type="password" />
      <br />
      <button>Sign In</button>
    </SignInModal>
    <SignUpModal>
      <div class = "input" :class = "{inValid : $v.email.$error}">
        <label>Email Id:*</label>
        <input 
              type="email" 
              id = "email"
              v-model="email"
              @blur="$v.email.touch()"/>
        <span v-if="!$v.email.required">email is required</span>
        <span v-if="!$v.email.email">Please provide the valid email address.</span>
      </div>
      <br />
      <div class = "input" :class = "{inValid : $v.phoneNumber.$error}">
        <label>Mobile Number:*</label>
        <input 
              type="tel" 
              id = "phoneNumber"
              v-model="phoneNumber"
              @blur="$v.phoneNumber.touch()"/>
        <span v-if="!$v.phoneNumber.required">phoneNumber is required</span>
        <span v-if="!$v.phoneNumber.minLength">phoneNumber must be atleast {{$v.phoneNumber.$params.minLength.min}} digit.</span>
        <span v-if="!$v.phoneNumber.number">phoneNumber should contain only numbers.</span>
      </div>
      <br />
      <div class = "input" :class = "{inValid : $v.gender.$error}">
        <label>Gender:*</label>
        <input 
              type="checkbox"
              id = "gender"
              v-model="gender" 
              @blur="$v.gender.touch()"/>
        <span v-if="!$v.gender.required">gender is required</span>
      </div>
      <br />
      <div class = "input" :class = "{inValid : $v.password.$error}">
        <label>Password:*</label>
        <input 
              type="password" 
              id = "password"
              v-model="password"
              @blur="$v.password.touch()"/>
        <span v-if="!$v.password.required">password is required</span>
        <span v-if="!$v.password.minLength">password length must be atleast {{$v.password.$params.minLength.min}}</span>
      </div>
      <br />
      <div class = "input" :class = "{inValid : $v.confirmPassword.$error}">
        <label>Password:*</label>
        <input 
              type="password" 
              id = "confirmPassword"
              v-model="password"
              @blur="$v.confirmPassword.touch()"/>
        <span v-if="!$v.confirmPassword.required">confirm Password is required</span>
        <span v-if="!$v.confirmPassword.sameAs">entered password should match.</span>
      </div>
      <br />
      <button slot="btn" id="main-btn">Sign Up</button>
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
  number,
  sameAs,
  minLength
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      confirmPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    phoneNumber: {
      required,
      number,
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
  color: 1px solid rgb(255, 0, 0);
}

#main-btn {
  text-align: center;
}
</style>
