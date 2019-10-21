<template>
  <div>

    <b-modal id="modal-center-signin" hide-footer centered title="Login">
      <alert-message  v-if = "error" :errorMessage = "error.message"></alert-message>
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
          <v-btn class="btn btn-primary" :loading = "loading" type = "submit" :disabled="$v.form.$invalid">
            <span slot = "loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
           Sign In</v-btn>
        </div>
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
    };
  },
  created() {
    // this.isLoggedIn = this.isSessionExpire;
    console.log('...mapGetters([users]) for global alert message>>>>>>>>',...mapGetters(['error']));
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
      console.log('signin login button clicked>>>>>>>>>>>>>>>')
      if (!this.$v.form.$invalid) {
        console.log('props data in loginc form >>>>>>>',this);
        var data = {
          email : this.form.loginEmail,
          password : this.form.loginPassword
        };
        this.$store.dispatch('handleLogin',data)
        .then(result => {
          // this.$bvModal.hide('modal-center-signin');
          this.$router.push('/')
          // this.$emit('userIsLoggedIn',true)
          // router.go();
        })
        .catch(err => {
          this.$v.$touch();
          console.log('err in login method>>>>>>>>>>>',err)
        })
      }
    },
    openSignUpModal() {
      this.$bvModal.hide('modal-center-signin');
      this.$bvModal.show('modal-center-signup');
      this.$store.commit('clearError',null);
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
    ...mapGetters(['loading','error','users']),
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
      margin-left: 0;
      background-color: #0069d9 !important;
    }

    .custom-loader {
      animation: loader 1s infinite;
      display: flex;
    }

    @-moz-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @-o-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
</style>
