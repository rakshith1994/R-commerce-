<template>
<div >
    <!-- <b-button v-b-modal.modal-center >{{title}}</b-button> -->
  <b-modal id="modal-center-signin"  hide-footer centered title='Sign In'>
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
