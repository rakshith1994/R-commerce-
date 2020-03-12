<template>
  <div>
    <Header></Header>
    <!-- <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="4">
          <v-card v-for="(product,index) in products" :key="index" class="pa-2" outlined tile>
            <img :src="product.imgUrl" height="200" width="200">
          <br>{{product.name}}
          <br>Cost:{{product.price.inr}}
            <br><v-btn @click="addtoCart(product)">Add to Cart</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
    <v-flex xs2>
         <v-card v-for="(product,index) in products" :key="index" class="pa-2" outlined tile>
            <img :src="product.imgUrl" height="200" width="200">
          <br>{{product.name}}
          <br>Cost:{{product.price.inr}}
            <br><v-btn @click="addtoCart(product)">Add to Cart</v-btn>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      selectedProduct: ""
    };
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  methods:{
    addtoCart(data){
      this.$store.dispatch('ADD_TO_CART',{isUserLoggedIn:this.$store.state.isUserLoggedIn,product:data});
    }
  },
  computed: {
    products(){ 
        for (let collection in this.$store.state.collectionData) {
          if (this.id == this.$store.state.collectionData[collection].id) {
            return this.$store.state.collectionData[collection].product;
          }
        }
    } 
  },
  mounted() {
    this.$store.subscribe((mutations, state) => {
      for (let collection in state.collectionData) {
        if (this.id == this.$store.state.collectionData[collection].id) {
          this.products = this.$store.state.collectionData[collection].product;
        }
      }
      console.log('this.prods',this.products);
    });
  }
};
</script>