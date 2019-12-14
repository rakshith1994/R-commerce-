<template>
    <div >
        <div class = "men">
            <Header></Header>
            <h1>Mens</h1>
            <div class= "container col-md-6 col-md-6">
                <div class = "row">
                    <img src ="../../../assets/menCollection.jpg"/>
                </div>
                <div class = "row">
                    <img src ="../../../assets/menCollection1.jpg"/>
                </div>
            </div>
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