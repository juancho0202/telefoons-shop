<template>
  <div class="container overflow-hidden">
    <div class="row gx-5">
      <PhoneResult class="col-12 col-md-6 col-lg-4 mb-4" v-for="phone in filteredProducts" :key="phone.id" :product="phone" />
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
  declare filteredProducts: Array<ProductModel>;
}
</script>
