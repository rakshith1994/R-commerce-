<template>
  <div>
    <b-modal id="modal-center-signin" hide-footer centered title="Login">
      <form @submit.prevent = login>
        <div class="input" :class="{inValid: $v.form.loginEmail.$error}">
          <label :class = "{error_message: $v.form.loginEmail.$error}" >Email Id:*</label>
          <input
            name="email"
            class="form-control"
            type="email"
            v-model="form.loginEmail"
            @blur="$v.form.loginEmail.$touch()"
          />
          <template v-if="$v.form.loginEmail.$error">
            <span class="error_message" v-if="!$v.form.loginEmail.required">email is required</span>
            <span
              class="error_message"
              v-if="!$v.form.loginEmail.email"
            >Please provide the valid email address.</span>
          </template>
        </div>
        <br />
        <div class="input" :class="{inValid: $v.form.loginPassword.$error}">
          <label :class = "{error_message: $v.form.loginPassword.$error}">Password:*</label>
          <input
            name="password"
            class="form-control"
            type="password"
            v-model="form.loginPassword"
            @blur="$v.form.loginPassword.$touch()"
          />
          <template v-if="$v.form.loginPassword.$error">
            <span class="error_message" v-if="!$v.form.loginPassword.required">password is required</span>
          </template>
        </div>
        <hr />
        <div class = "signUp">
          <button class="btn btn-primary" :disabled="$v.form.$invalid">Sign In</button>
        </div>
        <v-snackbar  v-model="loginSuccessSnackbar" :top="true" :multi-line="multiLine" :timeout="3000" >YaY! Login SuccessFull.</v-snackbar>
        <v-snackbar  v-model="loginFailSnackbar" color= "error" :top="true" :multi-line="multiLine" :timeout="3000">inValid email or password. Please try again!</v-snackbar>
      </form>
      <div class = "forgotPassword" @click = "forgotPasswordLink"><strong>Forgot Password?</strong></div>
      <hr/>
      <div class = "createAccount" @click = "openSignUpModal">
        <span>Don't have an account yet?</span><strong class = "registerlink"> Register</strong>
      </div>
    </b-modal>
    <forgotPassword></forgotPassword>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import forgotPassword from './forgotPassword';
import {mapGetters} from 'vuex';

export default {
  props : ['isUserLoggedIn'],
  data() {
    return {
      form: {
        loginEmail: "",
        loginPassword: ""
      },
      multiLine: true,
      loginSuccessSnackbar: false,
      loginFailSnackbar : false
    };
  },
  validations: {
    form: {
      loginEmail: {
        required,
        email
      },
      loginPassword: {
        required
      }
    }
  },
  methods: {
    login() {
      if (!this.$v.form.$invalid) {
        console.log('props data in loginc form >>>>>>>',this);
        var data = {
          email : this.form.loginEmail,
          password : this.form.loginPassword
        };
        this.$store.dispatch('handleLogin',data)
        .then(result => {
          this.$bvModal.hide('modal-center-signin');
          this.$router.push('/')
          this.$emit('userIsLoggedIn',true)
          this.loginSuccessSnackbar = true;
        })
        .catch(err => {
          this.loginFailSnackbar = true
          this.$v.$touch();
          console.log('this.$v>>>>>>',this.$v.form)
        })
      }
    },
    openSignUpModal() {
      this.$bvModal.hide('modal-center-signin');
      this.$bvModal.show('modal-center-signup');
    },
    forgotPasswordLink(){
      this.$bvModal.hide('modal-center-signin');
      this.$bvModal.show('modal-center-forgot');
      this.$emit('openForgotPasswordModal',true);
    },
    resetForm() {
      var self = this;
      Object.keys(this.form).forEach(function(key, index) {
        self.form[key] = "";
        self.$v.form[key].$invalid = true;
      });
    }
  },
  computed : {
    userLogin(){
      return this.$store.state.isUserLoggedIn ? this.loginSuccessSnackbar = true : false;
    }
  },
  components : {
    forgotPassword 
  }
};
</script>

<style>
    .modal-title{
      text-transform: uppercase;
      font-weight: 700;
    }
    .forgotPassword{
        text-align: center;
        margin: 15px 0 0 0;
    }
    .createAccount{
      text-align: center;
    }
    .createAccount > span {
      width: 100%;
      border-radius: 0px;
    }
    .registerlink{
      font-weight: 700;
    }
    .signUp > button {
      width: 100%;
      border-radius: 0px;
    }
</style>
