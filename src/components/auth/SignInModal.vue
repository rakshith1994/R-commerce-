<template>
  <div>
    <b-modal id="modal-center-signin" hide-footer centered title="Sign In">
      <form @submit.prevent="login">
        <div class="input" :class="{inValid: $v.form.loginEmail.$error}">
          <label>Email Id:*</label>
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
          <label>Password:*</label>
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
        <button class="btn btn-primary" :disabled="$v.form.$invalid">Sign In</button>
        <v-snackbar v-model="snackbar" :multi-line="multiLine" :timeout="1000">Login SuccessFull.</v-snackbar>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  props : ['isUserLoggedIn'],
  data() {
    return {
      form: {
        loginEmail: "",
        loginPassword: ""
      },
      multiLine: true,
      snackbar: false
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
  updated() {
    console.log("component updated>>>>");
  },
  methods: {
    login() {
      if (!this.$v.form.$invalid) {
        // this.$bvModal.hide('modal-center-signup');
        console.log('props data in loginc form >>>>>>>',this);
        this.$emit('userCredentialReset',true)
        const loginData = {
          userEmail : this.loginEmail,
        }
        this.snackbar = true;
      }
    },
    resetForm() {
      var self = this;
      Object.keys(this.form).forEach(function(key, index) {
        self.form[key] = "";
        self.$v.form[key].$invalid = true;
      });
    }
  }
};
</script>

<style scooped>
</style>
