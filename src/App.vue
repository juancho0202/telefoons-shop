<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductPropertyFilter filterPropertyText="Brand" :filterOptions="filterOptionsTest" @toggleFilterOption="toggleFilter"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPropertyFilter from '@/components/common/ProductPropertyFilter.vue';

@Component({
  components: {
    ProductPropertyFilter,
  },
})
export default class App extends Vue {
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
