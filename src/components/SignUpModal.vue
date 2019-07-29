<template>
<div >
    <!-- <b-button v-b-modal.modal-center >{{title}}</b-button> -->
    <b-modal id="modal-center-signup" hide-footer  centered title='Sign Up'>
    <slot></slot>
  </b-modal>
</div> 
</template>

<script>

export default {
    data(){
        return {
            
        }
    }
}
</script>

<style scooped>
</style>
