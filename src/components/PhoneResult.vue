<template>
  <div>
    <div class="container mx-2 border">
      <div class="product-image">
        <img src="@/assets/phone.webp" alt="Phone" class="img-thumbnail border-0">
        <span
          v-if="stickerAvailable()"
          class="badge badge-pill badge-primary">
          {{product.attributes.handset_cat_promotion_sticker}}
        </span>
      </div>
      <p class="text-muted mb-0">{{product.manufacturer}}</p>
      <h4><b>{{product.name}}</b></h4>
      <PromoAlert v-if="promoAlertAvailable()" :bgHexColor="product.attributes.promotion_bg_color">
        <b>{{product.attributes.promotion_label}}</b>
      </PromoAlert>
      <div class="d-flex justify-content-end">
        <p style="cursor:pointer">
          Go to device
          <span class="rounded-circle border border-primary text-light bg-primary">&nbsp;>&nbsp;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromoAlert from '@/components/common/PromoAlert.vue';
import ProductModel from '@/models/product-model';

@Component({
  components: {
    PromoAlert,
  },
  props: {
    product: {
      type: ProductModel,
      default: new ProductModel(),
    },
  },
})
export default class PhoneResult extends Vue {
  declare product: ProductModel;

  public promoAlertAvailable(): boolean {
    return this.product.attributes?.promotion_label !== null && this.product.attributes?.promotion_label !== '' && this.product.attributes?.promotion_label?.length !== 0;
  }

  public stickerAvailable(): boolean {
    return this.product.attributes?.handset_cat_promotion_sticker !== null && this.product.attributes?.handset_cat_promotion_sticker !== '' && this.product.attributes?.handset_cat_promotion_sticker?.length !== 0;
  }
}
</script>
