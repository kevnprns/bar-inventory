export default class Drink {

  private _drinkID: number;
  private _name: string;
  private _description: string;
  private _quantity: number;

  constructor(drinkID: number, newName: string, newDescription: string, newQuantity: number) {
    this._drinkID = drinkID;
    this._name = newName;
    this._description = newDescription;
    this._quantity = newQuantity;
  }

  // accessors && mutators
  get drinkID(): number {
    return this._drinkID;
  }
  set drinkID(drinkID: number) {
    this._drinkID = drinkID;
  }
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

  public serialize(): string {
    return JSON.stringify(this);
  }


}
