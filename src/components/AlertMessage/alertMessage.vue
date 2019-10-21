<template>
    <v-alert class = "globalAlert" type = "error" :value = "true" transition = "scale-transition" dismissible>
        <span>{{errorMessage}}</span>
    </v-alert>
</template>

<script>
export default {
    props :['errorMessage'],
    data(){
        return {

        }
    }
}
</script>
<style>
    .globalAlert {
        background-color: #ff5252;
    }
</style>