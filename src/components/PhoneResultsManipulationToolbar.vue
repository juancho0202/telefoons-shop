<template>
  <div>
    <div class="d-none d-lg-flex">
      <ProductPropertyFilter class="me-2" filterPropertyText="Brand" :filterOptions="brandsList" @toggleFilterOption="toggleBrandFilter"/>
      <ProductPropertyFilter class="me-2" filterPropertyText="Color" :filterOptions="colorOptionsList" @toggleFilterOption="toggleColorFilter"/>
      <ProductPropertyFilter class="me-2" filterPropertyText="5G" :filterOptions="has5gOptionsList" @toggleFilterOption="toggle5GFilter"/>
      <ProductPropertyFilter class="me-2" filterPropertyText="Operating System" :filterOptions="operatingSystemList" @toggleFilterOption="toggleOSFilter"/>
      <ProductPropertyFilter class="me-2" filterPropertyText="E-sim" :filterOptions="hasESimOptionsList" @toggleFilterOption="toggleESimFilter"/>
      <ProductPropertyFilter filterPropertyText="Refurbished" :filterOptions="hasESimOptionsList" @toggleFilterOption="toggleESimFilter"/>
      <div class="btn-group ms-auto d-flex align-items-center">
        <span class="d-none d-lg-block text-nowrap me-2"><b>Sort by:</b></span>
        <select class="form-select" aria-label="Sort Select" @change="sort($event)" v-model="sortModel">
          <option value="" disabled> Select a sort criteria</option>
          <option v-for="option in sortingOptionsList" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
      </div>
    </div>
    <div class="d-lg-none d-grid gap-2">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
        aria-controls="sidebar">
        Filter and sort
      </button>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarLabel">Filter and sort</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body text-start">
        <div class="mb-2">
          <a href="#" class="link-primary">Remove all filters</a>
        </div>
        <h4><b>Sort</b></h4>
        <div id="sortOptions" class="text-center">
          <div v-for="option in sortingOptionsList" :key="option.value" class="form-check border border-secondary p-2">
            <label class="w-100 form-check-label">
              <input type="radio" :value="option.value" @change="sort($event)" v-model="sortModel">
              {{option.name}}
            </label>
          </div>
        </div>
        <hr />
        <h4><b>Filter</b></h4>
        <div class="d-flex flex-column">
          <ProductPropertyFilter anchorClass="w-100" filterPropertyText="Brand" :filterOptions="brandsList" @toggleFilterOption="toggleBrandFilter"/>
          <ProductPropertyFilter class="me-2" filterPropertyText="Color" :filterOptions="colorOptionsList" @toggleFilterOption="toggleColorFilter"/>
          <ProductPropertyFilter class="mt-2" anchorClass="w-100" filterPropertyText="5G" :filterOptions="has5gOptionsList" @toggleFilterOption="toggle5GFilter"/>
          <ProductPropertyFilter class="mt-2" anchorClass="w-100" filterPropertyText="Operating System" :filterOptions="operatingSystemList" @toggleFilterOption="toggleOSFilter"/>
          <ProductPropertyFilter class="mt-2" anchorClass="w-100" filterPropertyText="E-sim" :filterOptions="hasESimOptionsList" @toggleFilterOption="toggleESimFilter"/>
          <ProductPropertyFilter class="mt-2" anchorClass="w-100" filterPropertyText="Refurbished" :filterOptions="hasESimOptionsList" @toggleFilterOption="toggleESimFilter"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPropertyFilter from '@/components/common/ProductPropertyFilter.vue';
import { filtersAndSortComputed, setSortingValue } from '@/stateful-services/phone-feed-service';
import FilterOptionModel from '@/models/filter-option-model';
import ColorOptionModel from '@/models/color-option-model';

@Component({
  components: {
    ProductPropertyFilter,
  },
  computed: { ...filtersAndSortComputed },
})
export default class PhoneResultsManipulationToolbar extends Vue {
  declare brandsList: Array<FilterOptionModel>;

  declare colorOptionsList: Array<ColorOptionModel>;

  declare has5gOptionsList: Array<FilterOptionModel>;

  declare operatingSystemList: Array<FilterOptionModel>;

  declare hasESimOptionsList: Array<FilterOptionModel>;

  declare isRefurbishedOptionsList: Array<FilterOptionModel>;

  // Sorting options

  private sortModel = '';

  private sortingOptionsList: Array<any> = [
    { name: 'Phone Name', value: '1' },
    { name: 'Brand Name', value: '2' },
    { name: 'Promo First', value: '3' },
  ];

  public sort(event: any) {
    setSortingValue(event.target?.value);
  }

  // Clear space for reusability refactor here

  public toggleBrandFilter(optionName: string):void {
    this.brandsList = this.brandsList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }

  public toggleColorFilter(optionName: string):void {
    this.colorOptionsList = this.colorOptionsList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }

  public toggle5GFilter(optionName: string):void {
    this.has5gOptionsList = this.has5gOptionsList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }

  public toggleOSFilter(optionName: string):void {
    this.operatingSystemList = this.operatingSystemList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }

  public toggleESimFilter(optionName: string):void {
    this.hasESimOptionsList = this.hasESimOptionsList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }

  public toggleRefurbishedFilter(optionName: string):void {
    this.isRefurbishedOptionsList = this.isRefurbishedOptionsList.map((opt) => (opt.name === optionName ? { ...opt, active: !opt.active } : opt));
  }
}
</script>
