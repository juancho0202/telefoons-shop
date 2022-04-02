import AttributesModel from './attributes-model';

export default class ProductModel {
  public id: number | undefined;

  public name: string | undefined;

  public manufacturer: string | undefined;

  public operating_system: string | undefined;

  public has_5g: boolean | undefined;

  public colors: Array<string> | undefined;

  public has_esim: boolean | undefined;

  public refurbished: boolean | undefined;

  public attributes: AttributesModel | undefined;

  constructor(init?: Partial<ProductModel>) {
    Object.assign(this, init);
  }
}
