<template>
  <div :class="['alert', variant]" role="alert" :style="{'background-color': bgHexColor?bgHexColor+' !important':''}">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
/* When used alongside a promo-sticker in a product,
 passing the same color variant as the sticker may be useful */
@Component({
  props: {
    variant: {
      type: String,
      default: 'alert-success',
    },
    bgHexColor: {
      type: String,
      default: null,
    },
  },
})
export default class PromoAlert extends Vue {}
</script>
