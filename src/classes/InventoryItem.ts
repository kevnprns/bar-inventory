import Drink from '@/classes/Drink.ts';

export default class InventoryItem {
  private _drinkType: Drink;
  private _currentStock: number;
  private _requiredStock: number;

  constructor(newDrinkType: Drink, newCurrentStock: number, newRequiredStock: number) {
    this._drinkType = newDrinkType;
    this._currentStock = newCurrentStock;
    this._requiredStock = newRequiredStock;
  }

  // Accessors
  get drinkType(): Drink {
    return this._drinkType;
  }
  set drinkType(newDrinkType: Drink) {
    this._drinkType = newDrinkType;
  }
  get currentStock(): number {
    return this._currentStock;
  }
  set currentStock(newCurrentStock: number) {
    this._currentStock = newCurrentStock;
  }
  get requiredStock(): number {
    return this._requiredStock;
  }
  set requiredStock(newRequiredStock: number) {
    this._requiredStock = newRequiredStock;
  }
  // Mutators




  /* stockItem
    Description: Adds number to the objects currentStock
    In: number
    Out: void
  */
  public stockItem(topUpValue: number): void {
    this._currentStock = this._currentStock + topUpValue;
  }

  /* topUp
    Description: Tops up currentStock if it is smaller than the requiredStock
    In: void
    Out: void
  */
  public topUp(): void {
    if (this._currentStock < this._requiredStock) {
      this._currentStock = this._requiredStock;
    }
  }

  /* topUp
    Description: Decrements the currentStock by 1 if it is not already 0
                Used for the drink button in the UI
    In: void
    Out: void
  */
  public decrementStock(): void {
    if (this._currentStock !== 0) {
      this._currentStock--;
    }
  }


}
