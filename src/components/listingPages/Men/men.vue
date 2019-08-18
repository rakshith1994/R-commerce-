<template>
    <div >
        <div class = "men">
            <header-component :name = "isSideBarActive"></header-component>
            <h1>Mens</h1>
        </div>
        <footer-component></footer-component>
    </div>
</template>
<script>
import Header from "../../header/Header"
import Footer from "../../footer/footer"

export default {
    props : [
        'isSideBarActive'
    ],
    data() {
        return {
        }
    },
    created() {
        console.log('created>>>>');
        console.log('created>>>>',this.props);
    },
    components : {
        'header-component' : Header,
        'footer-component' : Footer
    }
}
</script>
<style>
    .men{
        text-align: center;
    }
</style>