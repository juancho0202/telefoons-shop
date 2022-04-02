<template>
  <div id="app">
    <div class="container">
      <PhoneResultsManipulationToolbar class="mt-4" />
      <PhoneResultsContainer class="pt-4" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PhoneResultsContainer from '@/components/PhoneResultsContainer.vue';
import PhoneResultsManipulationToolbar from '@/components/PhoneResultsManipulationToolbar.vue';
import getPhoneFeed from '@/stateful-services/phone-feed-service';

@Component({
  components: {
    PhoneResultsContainer,
    PhoneResultsManipulationToolbar,
  },
})
export default class App extends Vue {
  public async beforeMount(): Promise<void> {
    await getPhoneFeed();
  }
}
</script>
