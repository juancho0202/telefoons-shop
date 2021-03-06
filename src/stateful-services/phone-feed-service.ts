import FilterOptionModel from '@/models/filter-option-model';
import ProductModel from '@/models/product-model';
import ColorOptionModel from '@/models/color-option-model';
import axios from 'axios';
import Vue from 'vue';

const initialState = {
  products: new Array<ProductModel>(),
  brandsList: new Array<FilterOptionModel>(),
  operatingSystemList: new Array<FilterOptionModel>(),
  has5gOptionsList: [
    new FilterOptionModel({ name: 'Yes', active: false }),
    new FilterOptionModel({ name: 'No', active: false }),
  ],
  hasESimOptionsList: [
    new FilterOptionModel({ name: 'Yes', active: false }),
    new FilterOptionModel({ name: 'No', active: false }),
  ],
  isRefurbishedOptionsList: [
    new FilterOptionModel({ name: 'Yes', active: false }),
    new FilterOptionModel({ name: 'No', active: false }),
  ],
  colorOptionsList: new Array<ColorOptionModel>(),
  sortedBy: '',
};

const phonesState = Vue.observable(initialState);

export const filtersAndSortComputed = {
  brandsList: {
    get(): Array<FilterOptionModel> {
      return phonesState.brandsList;
    },
    set(value: Array<FilterOptionModel>): void {
      phonesState.brandsList = value;
    },
  },
  operatingSystemList: {
    get(): Array<FilterOptionModel> {
      return phonesState.operatingSystemList;
    },
    set(value: Array<FilterOptionModel>): void {
      phonesState.operatingSystemList = value;
    },
  },
  has5gOptionsList: {
    get(): Array<FilterOptionModel> {
      return phonesState.has5gOptionsList;
    },
    set(value: Array<FilterOptionModel>): void {
      phonesState.has5gOptionsList = value;
    },
  },
  hasESimOptionsList: {
    get(): Array<FilterOptionModel> {
      return phonesState.hasESimOptionsList;
    },
    set(value: Array<FilterOptionModel>): void {
      phonesState.hasESimOptionsList = value;
    },
  },
  isRefurbishedOptionsList: {
    get(): Array<FilterOptionModel> {
      return phonesState.isRefurbishedOptionsList;
    },
    set(value: Array<FilterOptionModel>): void {
      phonesState.isRefurbishedOptionsList = value;
    },
  },
  colorOptionsList: {
    get(): Array<ColorOptionModel> {
      return phonesState.colorOptionsList;
    },
    set(value: Array<ColorOptionModel>): void {
      phonesState.colorOptionsList = value;
    },
  },
};

function activeBrandFilters(): Array<FilterOptionModel> {
  return phonesState.brandsList.filter((filter) => filter.active);
}

function activeColorFilters(): Array<ColorOptionModel> {
  return phonesState.colorOptionsList.filter((filter) => filter.active);
}

function activehas5gFilters(): Array<FilterOptionModel> {
  return phonesState.has5gOptionsList.filter((filter) => filter.active);
}

function activeOSFilters(): Array<FilterOptionModel> {
  return phonesState.operatingSystemList.filter((filter) => filter.active);
}

function activeESimFilters(): Array<FilterOptionModel> {
  return phonesState.hasESimOptionsList.filter((filter) => filter.active);
}

function activeRefurbishedFilters(): Array<FilterOptionModel> {
  return phonesState.isRefurbishedOptionsList.filter((filter) => filter.active);
}

export const phonesComputed = {
  filteredAndSortedProducts: {
    get(): Array<ProductModel> {
      const filteredPhones = phonesState.products.filter(
        (product) => {
          // Brand Filter
          const activeBrands = activeBrandFilters();
          if (activeBrands.length > 0) {
            if (!activeBrands.some((brand) => brand.name === product.manufacturer)) return false;
          }
          // Color Filter
          const activeColors = activeColorFilters();
          if (activeColors.length > 0) {
            if (!activeColors.some((color) => product.colors?.indexOf(color.name) !== -1)) return false;
          }
          // Has 5G Filter
          const active5g = activehas5gFilters();
          if (active5g.length === 1) {
            if (active5g[0].name !== (product.has_5g ? 'Yes' : 'No')) return false;
          }
          // OS Filter
          const activeOS = activeOSFilters();
          if (activeOS.length === 1) {
            if (activeOS[0].name !== product.operating_system) return false;
          }
          // Has eSim Filter
          const activESim = activeESimFilters();
          if (activESim.length === 1) {
            if (activESim[0].name !== (product.has_esim ? 'Yes' : 'No')) return false;
          }
          // Is Refurbished
          const activeRefurbished = activeRefurbishedFilters();
          if (activeRefurbished.length === 1) {
            if (activeRefurbished[0].name !== (product.refurbished ? 'Yes' : 'No')) return false;
          }
          return true;
        },
      );
      if (phonesState.sortedBy === '1') {
        return filteredPhones.sort(
          (productA: ProductModel, productB: ProductModel) => productA.name.localeCompare(productB.name),
        );
      }
      if (phonesState.sortedBy === '2') {
        return filteredPhones.sort(
          (productA: ProductModel, productB: ProductModel) => productA.manufacturer.localeCompare(productB.manufacturer),
        );
      }
      if (phonesState.sortedBy === '3') {
        return filteredPhones.sort(
          (productA: ProductModel, productB: ProductModel) => productB.attributes?.promotion_label?.length || -1,
        );
      }
      return filteredPhones.sort(
        (productA: ProductModel, productB: ProductModel) => {
          if (productA.sort_order < productB.sort_order) {
            return -1;
          }
          if (productA.sort_order > productB.sort_order) {
            return 1;
          }
          return 0;
        },
      );
    },
  },
};

const generateBrandsList = (products:Array<ProductModel>):Array<FilterOptionModel> => (products.reduce(
  (brandsList: Array<FilterOptionModel>, currentProduct: ProductModel) => {
    const { manufacturer } = currentProduct;
    if (!brandsList.find((brand) => brand.name === manufacturer)) {
      brandsList.push(new FilterOptionModel({ name: manufacturer, active: false }));
    }
    return brandsList;
  },
  [],
));

const generateOSList = (products:Array<ProductModel>):Array<FilterOptionModel> => (products.reduce(
  (osList: Array<FilterOptionModel>, currentProduct: ProductModel) => {
    const { operating_system } = currentProduct;
    if (!osList.find((os) => os.name === operating_system)) {
      osList.push(new FilterOptionModel({ name: operating_system, active: false }));
    }
    return osList;
  },
  [],
));

const generateColorsList = (products:Array<ProductModel>) => (products.reduce<ColorOptionModel[]>(
  (colorsList: Array<ColorOptionModel>, currentProduct: ProductModel) => {
    // eslint-disable-next-line no-unused-expressions
    currentProduct.variants?.forEach((v) => {
      const name = v.attributes?.color;
      const color_code = v.attributes?.color_code;
      if (name && color_code && !colorsList.find((color) => color.name === name)) {
        colorsList.push({ name, color_code, active: false });
      }
    });
    return colorsList;
  },
  [],
));

export default async function getPhoneFeed(): Promise<void> {
  const response = await axios.get('/phone_feed.json');
  const phoneFeed = await response.data;
  if (phoneFeed) {
    const products: Array<ProductModel> = phoneFeed.products.map(
      (entry: any) => (new ProductModel(entry)),
    );
    phonesState.products = products;
    phonesState.brandsList = generateBrandsList(products);
    phonesState.operatingSystemList = generateOSList(products);
    phonesState.colorOptionsList = generateColorsList(products);
    return;
  }
  const error = 'Failed to retrieve phone_feed.json from server';
  throw new Error(error);
}

export function setSortingValue(value:string): void {
  phonesState.sortedBy = value;
}
