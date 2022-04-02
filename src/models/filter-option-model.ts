export default class FilterOptionModel {
  public name: string | undefined;

  public active: boolean | undefined;

  constructor(init?: Partial<FilterOptionModel>) {
    Object.assign(this, init);
  }
}
