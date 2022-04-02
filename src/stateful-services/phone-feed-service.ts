import FilterOptionModel from '@/models/filter-option-model';
import ProductModel from '@/models/product-model';
import axios from 'axios';
import Vue from 'vue';

const initialState = {
  products: new Array<ProductModel>(),
  filteredProducts: new Array<ProductModel>(),
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
};

const phonesState = Vue.observable(initialState);

export const filtersComputed = {
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

const generateColorsList = (products:Array<ProductModel>):Array<any> => (products.reduce(
  (colorsList: Array<any>, currentProduct: ProductModel) => {
    const colorName = currentProduct.attributes?.color_name;
    const colorHex = currentProduct.attributes?.color_code;
    if (!colorsList.find((color) => color.name === color)) {
      colorsList.push({ name: colorName, colorHex, active: false });
    }
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
    return;
  }
  const error = 'Failed to retrieve phone_feed.json from server';
  throw new Error(error);
}
