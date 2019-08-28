<template>
    <div class = "megaMenu">
        <router-link to = "/">
            <v-avatar 
                color="black"
                size="36" 
                @click="active=!active" 
            >
            <v-toolbar-title class = "logotitle">R</v-toolbar-title>
            </v-avatar>
        </router-link>  
        <vs-sidebar parent="body" default-index="1"  color="primary" class="hidden-lg-only hidden-sm-only sidebarx" spacer v-model="active">
            <vs-sidebar-item index="1" icon="question_answer">
                <!-- Dashboard -->
                <router-link to = "/">Dashboard</router-link>
            </vs-sidebar-item>
            <vs-sidebar-item index="2">
                <router-link to = "mens">Men</router-link>
            </vs-sidebar-item>
            <vs-sidebar-item index="3">
                <router-link to = "womens">Women</router-link>
            </vs-sidebar-item>
            <vs-sidebar-item index="4">
                <router-link to = "kids">kids</router-link>
            </vs-sidebar-item>
            <div class="footer-sidebar" slot="footer">
                <div class = "col-md-6 col-sm-6 col-xs-12 visible-xs login">
                    <vs-button type="flat" v-on:click="openModal('modal-center-signin')">Sign In</vs-button>
                    <vs-button type="flat" v-on:click="openModal('modal-center-signup')">Sign Up</vs-button>
                </div>
                <vs-button icon="reply"  type="flat" class = "logout">log out</vs-button>
             </div>
        </vs-sidebar>
    </div>
</template>
<script>
    export default {
        data() { 
            return  {
                active:false,
            }
        },
        methods: {
            openModal: function(idProp) {
                 this.$bvModal.show(idProp);
                 this.active = false
            }
        }
    }
</script>
<style>
    @import '../../css/menu.css';
</style>