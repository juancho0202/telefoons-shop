<template>
  <div id="app">
    <div class="container">
      <PhoneResultsManipulationToolbar />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPropertyFilter from '@/components/common/ProductPropertyFilter.vue';
import PhoneResultsManipulationToolbar from '@/components/PhoneResultsManipulationToolbar.vue';
import getPhoneFeed from '@/stateful-services/phone-feed-service';

@Component({
  components: {
    ProductPropertyFilter,
    PhoneResultsManipulationToolbar,
  },
})
export default class App extends Vue {
  public async beforeMount(): Promise<void> {
    await getPhoneFeed();
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
