import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    brandsList(state) {
      return state.products.reduce(
        (brandsList: Array<string>, currentProduct: any) => {
          const { manufacturer } = currentProduct;
          if (brandsList.indexOf(manufacturer) === -1) brandsList.push(manufacturer);
          return brandsList;
        },
        [],
      );
    },
    colorsList(state) {
      // Pending a refactor to include the color HEX code
      return state.products.reduce(
        (brandsList: Array<string>, currentProduct: any) => {
          const color = currentProduct.attributes.color_name;
          if (brandsList.indexOf(color) === -1) brandsList.push(color);
          return brandsList;
        },
        [],
      );
    },
  },
});
