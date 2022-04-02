export default class AttributesModel {
  public color_name: string | undefined;

  public color_code: string | undefined;

  public handset_cat_promotion_sticker: string | undefined;

  public promotion_label: string | undefined;

  public promotion_bg_color: string | undefined;

  constructor(init?: Partial<AttributesModel>) {
    Object.assign(this, init);
  }
}
