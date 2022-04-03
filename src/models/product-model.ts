import AttributesModel from './attributes-model';

export default class ProductModel {
  public id = -1;

  public name = '';

  public manufacturer = '';

  public sort_order = 9999999;

  public operating_system: string | undefined;

  public has_5g: boolean | undefined;

  public colors: Array<string> | undefined;

  public has_esim: boolean | undefined;

  public refurbished: boolean | undefined;

  public attributes: AttributesModel | undefined;

  public variants: Array<ProductModel> | undefined;

  constructor(init?: Partial<ProductModel>) {
    Object.assign(this, init);
  }
}
