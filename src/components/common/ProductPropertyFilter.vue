<template>
  <div class="btn-group">
    <a
      :class="['btn btn-secondary dropdown-toggle', anchorClass]" data-bs-toggle="dropdown"
      href="#" role="button" id="filterButtonLink" aria-expanded="false"
    >
      {{filterPropertyText}}
    </a>

    <ul class="dropdown-menu" aria-labelledby="filterButtonLink">
      <li v-for="option in filterOptions" :key="option.name">
        <a class="dropdown-item" href="#" @click="filterOptionClicked(option.name, $event)">
          <div class="form-check">
            <input
              @click="filterOptionClicked(option.name, $event)"
              class="form-check-input pe-none"
              type="checkbox"
              :checked="option.active"
            >
            <label class="form-check-label">
              {{option.name}}
            </label>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    filterPropertyText: {
      type: String,
      default: '',
    },
    filterOptions: {
      type: Array,
      default: [],
    },
    anchorClass: {
      type: String,
      default: '',
    },
  },
})
export default class ProductPropertyFilter extends Vue {
  public filterOptionClicked(optionName:string, event:any):void{
    event.preventDefault();
    event.stopPropagation();
    this.$emit('toggleFilterOption', optionName);
  }
}
</script>
