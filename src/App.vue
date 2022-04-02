<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductPropertyFilter filterPropertyText="Brand" :filterOptions="filterOptionsTest" @toggleFilterOption="toggleFilter"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import ProductPropertyFilter from '@/components/common/ProductPropertyFilter.vue';
import getPhoneFeed from '@/services/phone-feed-service';

@Component({
  components: {
    ProductPropertyFilter,
  },
  methods: {
    ...mapMutations({
      setProducts: 'setProducts',
    }),
  },
})
export default class App extends Vue {
  declare setProducts: (products: Array<any>)=>void;

  public filterOptionsTest = [
    {
      name: 'Apple',
      active: false,
    },
    {
      name: 'Samsung',
      active: false,
    },
    {
      name: 'Xiaomi',
      active: false,
    },
  ]

  public async beforeMount(): Promise<void> {
    const feed = await getPhoneFeed();
    if (feed) this.setProducts(feed.products);
    // eslint-disable-next-line no-debugger
    debugger;
  }

  public toggleFilter(filterOption:string):void{
    this.filterOptionsTest = this.filterOptionsTest.map((opt) => (opt.name === filterOption ? { ...opt, active: !opt.active } : opt));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
