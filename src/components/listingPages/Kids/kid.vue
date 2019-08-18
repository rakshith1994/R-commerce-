<template>
    <div >
        <div class = "kids">
            <header-component></header-component>
            <h1>Kids</h1>
        </div>
        <footer-component></footer-component>
    </div>
</template>
<script>
import Header from "../../header/Header"
import Footer from "../../footer/footer"

export default {
    data() {
        return {

        }
    },
    components : {
        'header-component' : Header,
        'footer-component' : Footer
    }
}
</script>
<style>
    .kids{
        text-align: center;
    }
</style>