<template>
  <div class="overflow-hidden">
    <div class="row">
      <PhoneResult v-for="phone in filteredAndSortedProducts" :key="phone.id" :product="phone" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PhoneResult from '@/components/PhoneResult.vue';
import { phonesComputed } from '@/stateful-services/phone-feed-service';
import ProductModel from '@/models/product-model';

@Component({
  components: {
    PhoneResult,
  },
  computed: { ...phonesComputed },
})
export default class PhoneResultsContainer extends Vue {
  declare filteredAndSortedProducts: Array<ProductModel>;
}
</script>
