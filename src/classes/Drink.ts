export default class Drink {

  private _name: string;
  private _description: string;
  private _quantity: number;

  constructor(newName: string, newDescription: string, newQuantity: number) {
    this._name = newName;
    this._description = newDescription;
    this._quantity = newQuantity;
  }

  // accessors && mutators
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
  get description(): string {
    return this._description;
  }
  set description(newDescription: string) {
    this._description = newDescription;
  }
  get quantity(): number {
    return this._quantity;
  }
  set quantity(newQuantity: number) {
    this._quantity = newQuantity;
  }

}
