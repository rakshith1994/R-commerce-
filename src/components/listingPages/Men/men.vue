<template>
    <div >
        <div class = "men">
            <Header></Header>
            <h1>Mens</h1>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>

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
    }
}
</script>
<style>
    .men{
        text-align: center;
    }
</style>