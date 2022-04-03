<template>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="border p-3 flex-grow-1 h-100 d-flex flex-column justify-content-between">
      <div
        class="product-image"
        :style="computedPhoneBackground"
      >
        <div class="row h-100">
          <div class="col d-flex align-items-center ps-5">
            <img
              src="../assets/smartpakker.png"
              v-if="stickerAvailable()"
              class="smartpakker" />
          </div>
          <div class="col d-flex flex-column align-items-end" v-if="filteredVariantsByColors.length>1">
            <a
              href="#"
              v-for="variant in filteredVariantsByColors"
              :key="variant.id"
              class="rounded-circle text-light border border-dark mb-2"
              :class="{'border-4':variantId === variant.id || variantId=== product.id}"
              @click="updateVariantId($event,variant.id)"
              :style="{'background-color':variant.attributes.color_code, 'height':'3em', 'width':'3em'}"
            >
            </a>
          </div>
        </div>
      </div>
      <div>
        <p class="text-muted mb-0">{{product.manufacturer}}</p>
        <h4><b>{{product.name}}</b></h4>
      </div>
      <PromoAlert v-if="promoAlertAvailable()" :bgHexColor="product.attributes.promotion_bg_color">
        <b>{{product.attributes.promotion_label}}</b>
      </PromoAlert>
      <div class="d-flex justify-content-end">
        <p style="cursor:pointer">
          <b>
            Go to device
            <span class="rounded-circle border border-primary text-light bg-primary">&nbsp;>&nbsp;</span>
          </b>
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

  private variantId = -1;

  public beforeMount() {
    this.variantId = this.product.variants ? this.product.variants[0].id : this.product.id;
  }

  public promoAlertAvailable(): boolean {
    return this.product.attributes?.promotion_label !== null && this.product.attributes?.promotion_label !== '' && this.product.attributes?.promotion_label?.length !== 0;
  }

  public stickerAvailable(): boolean {
    return this.product.attributes?.handset_cat_promotion_sticker !== null && this.product.attributes?.handset_cat_promotion_sticker !== '' && this.product.attributes?.handset_cat_promotion_sticker?.length !== 0;
  }

  public updateVariantId(event:any, id:number) {
    event.preventDefault();
    this.variantId = id;
  }

  public get checkIfOffline() {
    return !navigator.onLine;
  }

  public get filteredVariantsByColors() {
    return this.product.variants?.filter((v, i) => this.product.variants?.findIndex((variant) => variant.attributes?.color_code === v.attributes?.color_code) === i);
  }

  public get computedPhoneBackground() {
    return { 'background-image': `url(${this.checkIfOffline ? '@/assets/phone.webp' : `https://www.kpn.com/shop/cdn/products/_/product_${this.variantId}_main.webp`})` };
  }
}
</script>

<style>
.product-image{
  min-height:20em;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.smartpakker{
  width: 100px;
  height: 100px;
}
</style>
