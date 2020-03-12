<template>
  <div>
    <SignInModal></SignInModal>
    <SignUpModal>
      <alert-message  v-if = "error" :errorMessage = "error.message"></alert-message>
      <form @submit.prevent = "submitSignUpForm">
        <div class = "input" :class = "{inValid: $v.form.firstName.$error}">
          <label :class = "{error_message: $v.form.firstName.$error}">First Name:*</label>
          <input 
                type="firstName" 
                class="form-control"
                :class = "{validUsername : !$v.form.firstName.$error}"
                id = "firstName"
                v-model.lazy="form.firstName"
                @blur="$v.form.firstName.$touch()"/>
          <template v-if="$v.form.firstName.$error">
            <span class = "error_message" v-if="!$v.form.firstName.required">First Name must not be empty</span>
            <span class = "error_message" v-if="!$v.form.firstName.unique">Opps! UserName {{this.form.firstName}} already exists. Please try again.</span>
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
            <span class = "error_message"  v-if="!$v.form.phoneNumber.minLength">phoneNumber must be number with atleast {{$v.form.phoneNumber.$params.minLength.min}} digit.</span>
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
            <span class = "error_message"  v-if="!$v.form.password.minLength">password length must be atleast {{$v.form.password.$params.minLength.min}}</span>
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
        <!-- <button class = "btn btn-primary" slot="btn" id="main-btn" :disabled="$v.$invalid">Sign Up</button> -->
        <div class = "createAccount">
        <v-btn class = "btn btn-primary" slot="btn" :loading = "loading" type = "submit" id="main-btn">
            <span slot = "loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          Sign Up</v-btn>
        </div>
        <div class = "signin" @click = "openLoginModal">
          <span>Already have and account?</span><strong> Login</strong>
        </div>
        <!-- <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            :timeout= 5000
          >
          Hola! User Registered SuccessFull.
        </v-snackbar>
        <v-snackbar
            @showSessionOutSnakbar = "sessionOutSnackbar = $event"
            v-model="sessionOutSnackbar"
            :multi-line="multiLine"
            :timeout= 5000
          >
          Opps! Something happend wrong. Session timeOut, Please login again.
        </v-snackbar> -->
      </form>
    </SignUpModal>
    <v-toolbar flat>
      <!-- <sideBar></sideBar> -->
        <v-spacer></v-spacer>
      <div>
        <v-toolbar-items  class="hidden-sm-and-down">
          <v-btn flat v-if = !isLoggedIn v-on:click="openModal('modal-center-signin')">Sign In</v-btn>
          <v-btn flat v-if = !isLoggedIn v-on:click="openModal('modal-center-signup')">Sign Up</v-btn>
          <!-- <v-btn flat>
            <v-icon>local_grocery_store</v-icon>
          </v-btn> -->
          <CartDropdown></CartDropdown>         
          <!-- <v-btn flat></v-btn>
          <v-icon>presence-exit</v-icon>
          </v-btn> -->
          <div class = "loginUser" v-if = isLoggedIn>
                  <!-- <v-btn
                    color="primary"
                    v-on:click= "handleLogout"
                  >
                    logout
                  </v-icon> -->
                  <!-- <v-icon>mdiAccount</v-icon> -->
                  <!-- <vs-avatar v-on="on" src = "http://gravatar.com/avatar/+md5(this.form.firstName)+?d=identicon"/> -->
                  <vs-avatar src = "http://gravatar.com/avatar/md5+{this.form.firstName}+?d=identicon"/>
                  <!-- <vs-avatar v-on="on" src="https://randomuser.me/api/portraits/men/85.jpg"/> -->
                <!-- <v-list> -->
                  <!-- <v-list-item>
                    <v-list-item-title> login user name </v-list-item-title>
                  </v-list-item> -->
                <!-- </v-list>  -->
          </div>
          <v-btn text small v-if = isLoggedIn @click="handleLogout">signout</v-btn>
        <!-- <template>
          <v-container fluid>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="items"
                  label="Standard"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </template> -->
        </v-toolbar-items>
      </div>
    </v-toolbar>
      <div class = "hidden-xs-only megaMenu">
        <ul>
          <template v-for="(item, index) in collection" >
            <li :key="index" @mouseover = "handleMouseOver" @mouseleave = "handleMouseLeave">
                <router-link :to = item.id >{{item.id}}</router-link>
                <!-- <div :class = "{'isMegaMenuActive' : isMegaMenuActive}">
                  <div v-show="isMegaMenuActive">
                    <ul>
                      <li>sdsdsdsdsd</li>
                    </ul>
                  </div>
                </div> -->
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
  minLength,
  helpers
} from "vuelidate/lib/validators";
import signin from "../auth/SignInModal"
import CartDropdown from '../cart/CartDropdown';
// import sideBar from "../menu/menu"
import UserServices from '../../services/UserServices'
import { mapGetters } from 'vuex'

export default {
  props :['isActive','productAddedToCart'],
  data() {
    return {
      form : {
        firstName : "",
        lastName : "asdfg",
        email: "asdfgh@asdfg.com",
        password: "asdfgh",
        phoneNumber: "8908909098",
        gender: 'male',
        confirmPassword: "asdfgh"
      },
      drawer: true,
      mini: true,
      sessionOutSnackbar : false,
      isSubmitted : false,
      multiLine: true,
      snackbar: false,
      isLoggedIn : false,
      isMegaMenuActive : false,
      items : ['hiu','fdfd','fdfdfd','89uih'],
      collection:this.$store.state.collectionData
    };
  },
  created() {
    this.$store.subscribe((mutation,state)=>{
    this.collection = state.collectionData;
    console.log('dddd',this.collection);
    });
    // this.isLoggedIn = this.isSessionExpire;
    console.log('...mapGetters([users])>>>>>>>>>>>>',...mapGetters(['users','getCollData']));

  },
  validations: {
    form : {
      email: {
        required,
        email
      },
      firstName: {
        required,
        unique (value) {
          if(!helpers.req(value)) return true;
          return true;
          //   return new Promise((resolve,reject) => {
          //     this.$store.dispatch('getUserNameAvailable',{userName :this.form.firstName})
          //     .then(result => resolve(result))
          //     .catch(error => reject(error))
          // })
          // this.isAvailable
        }
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
    CartDropdown
    // "sideBar" : sideBar,
  },
  computed: {
    ...mapGetters(['loading','error','users']),
  },
  watch : {
    users(value,newValue) {
      if(value){
        console.log('Yay! watcher called i think we have achive this bloody baster authenticaion and authorization wiht apollo graphQL>>>>>>>>>>>>>>>>>>>>>',value,newValue);
        this.isLoggedIn = true;
      }else{
        console.log('inside the watch after token expire>>>>>>>>>>>>>>>>>>>>>>>',value);
        this.isLoggedIn = false;
        // this.sessionOutSnackbar = true;
        this.$router.push("/");
      }
    },
    getCollData(newVal,oldVal){
      // console.log('nw');
    }
  },
  methods: {
    openModal(idProp) {
      this.$bvModal.show(idProp);
    },
    openLoginModal() {
      this.$bvModal.hide('modal-center-signup');
      this.$bvModal.show('modal-center-signin');
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
        const user = {
          email: this.form.email,
          userName: this.form.firstName,
          password: this.form.password,
          dob : "29/09/1996",
          gender : "male"
        };
        this.snackbar = true;
        this.$store.dispatch("handleRegistration",user)
        .then(result => {
          // this.$store.dispatch('handleLogin',{email: user.email,password: user.password})
          // .then(result => {
          //   console.log('handling auto login>>>>>>>>>',result);
            this.isLoggedIn = true
            this.$bvModal.hide('modal-center-signup');
          // }).catch(error => new Error(error));
        }).catch(error => new Error(error));
      }
    },
    handleLogout(){
      console.log('inside handleLogout>>>>>>>>>>>>>');
      this.$store.dispatch("handleLogout");
    }
  }
};
</script>

<style >
@import "../../css/header.css";

</style>
