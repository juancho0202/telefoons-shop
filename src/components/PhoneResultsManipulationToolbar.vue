<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPropertyFilter from '@/components/common/ProductPropertyFilter.vue';
import { mapGetters } from 'vuex';

@Component({
  components: {
    ProductPropertyFilter,
  },
  computed: {
    ...mapGetters({
      brandsList: 'brandsList',
    }),
  },
})
export default class PhoneResultsManipulationToolbar extends Vue {
  declare brandsList: Array<string>;

  // public mounted(): void {
  //   alert(this.brandsList);
  // }
}
</script>
