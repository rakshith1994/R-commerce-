<template>
    <div>
        <b-modal id="modal-center-forgot" hide-footer  centered title='Forgot Password' @openForgotPasswordModal = "isForgotPasswordSelected = $event">
            <form @submit.prevent = "sendLink">
                <div class="input" :class="{inValid: $v.form.forgotEmail.$error}">
                <label :class = "{error_message: $v.form.forgotEmail.$error}" >Email Id:*</label>
                <input
                    name="email"
                    class="form-control"
                    type="email"
                    v-model="form.forgotEmail"
                    @blur="$v.form.forgotEmail.$touch()"
                />
                <template v-if="$v.form.forgotEmail.$error">
                    <span class="error_message" v-if="!$v.form.forgotEmail.required">email is required</span>
                    <span
                    class="error_message"
                    v-if="!$v.form.forgotEmail.email"
                    >Please provide the valid email address.</span>
                </template>
                </div>
                <br />
                <div class = "forgotLink">
                <button class="btn btn-primary" :disabled="$v.form.$invalid">Request link</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
    data(){
        return{
            form : {
                forgotEmail : ''
            },
            isForgotPasswordSelected : false
        }
    },
    validations: {
        form: {
            forgotEmail : {
                required,
                email
            }
        }
    },
    methods : {
        sendLink(){
            if(!this.$v.form.$invalid){
                this.$bvModal.hide('modal-center-forgot');
                // this.isForgotPasswordSelected = true
            }
        }
    }
}
</script>
<style scoped>

</style>