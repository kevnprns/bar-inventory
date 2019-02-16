import Drink from '@/classes/Drink.ts';
import axios from 'axios';

export default class InventoryItem {
  private _inventoryID: number;
  private _locationID: number;
  private _drinkType: Drink;
  private _currentStock: number;
  private _requiredStock: number;

  constructor(invID: number, locID: number, dType: Drink, curStock: number, reqStock: number) {
    this._inventoryID = invID;
    this._locationID = locID;
    this._drinkType = dType;
    this._currentStock = curStock;
    this._requiredStock = reqStock;
  }

  // Accessors & Mutators
  get inventoryID(): number {
    return this._inventoryID;
  }
  set inventoryID(inventoryID: number) {
    this._inventoryID = inventoryID;
  }
  get locationID(): number {
    return this._locationID;
  }
  set locationID(locationID: number) {
    this._locationID = locationID;
  }
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

  public serialize(): string {
    return JSON.stringify({
      drinkID: this.drinkType.drinkID,
      locationID: this.locationID,
      inventoryID: this.inventoryID,
      required: this.requiredStock,
      current: this.currentStock,
    });
  }


  /* stockItem
    Description: Adds number to the objects currentStock
    In: number
    Out: void
  */
  public stockItem(topUpValue: number): void {

    this._currentStock = this._currentStock + topUpValue;

  }

  public updateStock(currentStock: number, requiredStock: number): void {

    if (this._currentStock !== currentStock || this._requiredStock !== requiredStock) {

        const payload = {
          drinkID: this.drinkType.drinkID,
          locationID: this.locationID,
          current: currentStock,
          required: requiredStock,
        };

        const myObject = this;

        const base = 'http://24.138.161.30:5000/inventory/' + this.inventoryID.toString();

        axios.post(base, payload).then((response) => {
          alert('Updated Item Stock');
          alert(response.data);
          console.log('Updated Item Stock');
          console.log(response.data);

          myObject._currentStock = currentStock;
          myObject._requiredStock = requiredStock;

        }).catch((e) => {
            console.log('request failed');
            console.log(e);
        });
    }
  }

  /* topUp
    Description: Tops up currentStock if it is smaller than the requiredStock
    In: void
    Out: void
  */
  public topUp(): void {
    if (this._currentStock < this._requiredStock) {

      const payload = {
        drinkID: this.drinkType.drinkID,
        locationID: this.locationID,
        current: this.requiredStock,
        required: this.requiredStock,
      };

      const myObject = this;

      const base = 'http://24.138.161.30:5000/inventory/' + this.inventoryID.toString();

      alert(base);

      axios.post(base, payload).then((response) => {
        console.log('Topped up item');
        console.log(response.data);

        myObject._currentStock = myObject._requiredStock;

      }).catch((e) => {
          console.log('request failed');
          console.log(e);
      });

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

      const payload = {
        drinkID: this.drinkType.drinkID,
        locationID: this.locationID,
        current: (this.currentStock - 1),
        required: this.requiredStock,
      };

      const myObject = this;

      const base = 'http://24.138.161.30:5000/inventory/' + this.inventoryID.toString();


      axios.post(base, payload).then((response) => {
        console.log('Decremented Item');
        console.log(response.data);

        myObject._currentStock--;

      }).catch((e) => {
          console.log('request failed');
          console.log(e);
      });
    }
  }


}
