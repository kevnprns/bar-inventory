import InventoryItem from '@/classes/InventoryItem.ts';
import Drink from '@/classes/Drink.ts';
import axios from 'axios';

export default class Inventory {
  private _items: InventoryItem[];
  constructor(newItems: InventoryItem[]) {
    this._items = newItems;
  }

  // accessors
  get items(): InventoryItem[] {
    return this._items;
  }
  // mutators
  set items(newItems: InventoryItem[]) {
    this._items = newItems;
  }

  public serialize(): string {
    return JSON.stringify(this);
  }

  /* addDrink
    Description: Takes a drink and stock values and creates a InventoryItem to be added.
    In: Drink, number, number
    Out: void
  */
  public addDrink(newItem: InventoryItem): void {
    // does not check if Drink already exists
    this._items.push(newItem);
  }

  /* calculateStock
    Description: Checks each InventoryItem to see it it is below the minumum stock.
                Creates a list of items that the inventory needs to restock
    In: void
    Out: InventoryItem[]
        returns empty list if the inventory is fully stocked
  */
  public calculateStock(): InventoryItem[] {
    const requiredStock: InventoryItem[] = [];

    for (const item of this._items) {
      const diff = item.requiredStock - item.currentStock;
      if (diff > 0) {
        requiredStock.push(new InventoryItem(0, 0, item.drinkType, 0, diff));
      }
    }
    return requiredStock;
  }

  /* getDrinkList
    Description: Loops through InventoryItems and returns
                the list of drinks the inventory contains
    In: void
    Out: Drink[]
        returns empty list if the inventory has no items in it
  */
  public getDrinkList(): Drink[] {
    const drinkList: Drink[] = [];

    for (const item of this._items) {
      drinkList.push(item.drinkType);
    }
    return drinkList;
  }

  /* removeStock
    Description: Loops through requiredStock and takes out what has been requested from the inventory
                returning a list of inventory items containing the transferable drinks
    In: InventoryItem[]
    Out: InventoryItem[]
  */
  public removeStock(requiredStock: InventoryItem[]): InventoryItem[] {
    const transferableStock: InventoryItem[] = [];

    for (const item of requiredStock) {
      const drinkType: Drink = item.drinkType;
      const inventoryItem: InventoryItem = this.findInventoryItem(drinkType);
      let newCurrentStock: number = 0;

      const diff: number = inventoryItem.currentStock - item.requiredStock;
      if (diff < 0) {
        // cannot fill stock fully
        transferableStock.push(new InventoryItem(
          inventoryItem.inventoryID,
          inventoryItem.locationID,
          drinkType,
          (item.requiredStock + diff),
          0,
        ));
        inventoryItem.currentStock = 0;
      } else {
        // can fill stock without a problem.
        transferableStock.push(new InventoryItem(
          inventoryItem.inventoryID,
          inventoryItem.locationID,
          drinkType,
          item.requiredStock,
          0,
        ));
        inventoryItem.currentStock = diff;
      }

      console.log('Took Item from Overstock');
    }

    return transferableStock;
  }

  /* removeStock
    Description: Loops through requiredStock and takes out what has been requested from the inventory
                returning a list of inventory items containing the transferable drinks

    In: InventoryItem[]
    Out: InventoryItem[]
  */
  public addStock(transferableStock: InventoryItem[]): void {

    // const newJson: string = JSON.stringify(transferableStock);

    const transferableJson = [];

    for (const item of transferableStock) {
      transferableJson.push(JSON.parse(item.serialize()));
    }

    const payload = transferableJson;

    const myObject = this;
    const base = 'http://127.0.0.1:5000/inventory/add';
    // const base = 'http://24.138.161.30:5000/inventory/add';

    axios.put(base, payload).then((response) => {
      console.log('Updated Add Items Stock');
      console.log(response.data);

      for (const item of transferableStock) {
        const drinkType = item.drinkType;
        const inventoryItem = myObject.findInventoryItem(drinkType);

        inventoryItem.stockItem(item.currentStock);
      }

    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });

  }

  /* resetStock
    Description: Loops through Inventory Items and calls topUp() on each Item

    In: void
    Out: void
  */
  public resetStock(): void {
    for (const item of this._items) {
      item.topUp();
    }
  }

  /* findInventoryItem
    Description: Loops through inventory to find specific drink and returns its Inventory Item

    In: Drink
    Out: InventoryItem
  */
  public findInventoryItem(searchDrink: Drink): InventoryItem {

    for (const item of this._items) {
      if (searchDrink === item.drinkType) {
        return item;
      }
    }
    return new InventoryItem(0, 0, searchDrink, 0, 0);
  }

  /* addNewDrink
    Description: creates drink and adds it to the inventory

  */

  public addNewDrink(newDrinkName: string, newDrinkDescription: string, newDrinkQuantity: number, locationID: number, newCurrentStock: number, newRequiredStock: number) {
    const payload = {
      name: newDrinkName,
      description: newDrinkDescription,
      quantity: newDrinkQuantity.toString(),
    };

    const myObject = this;

    axios.post('http://127.0.0.1:5000/drinks', payload).then((response) => {
    // axios.post('http://24.138.161.30:5000/drinks', payload).then((response) => {
      console.log(response.data);

      const myData = response.data[0];

      const newDrink = new Drink(myData.drinkID, myData.name, myData.description, myData.quantity);
      myObject.createInventoryItem(newDrink, locationID, newCurrentStock, newRequiredStock);

    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });
  }

  public createInventoryItem(newDrink: Drink, locationID: number, newCurrentStock: number, newRequiredStock: number) {
    const payload = {
                      drinkID: newDrink.drinkID,
                      locationID: locationID,
                      current: newCurrentStock,
                      required: newRequiredStock,
                    };

    const myObject = this;

    axios.post('http://127.0.0.1:5000/inventory', payload).then((response) => {
    // axios.post('http://24.138.161.30:5000/inventory', payload).then((response) => {
      console.log(response.data);
      const myData = response.data[0];

      const newInventoryItem =
      new InventoryItem(myData.inventoryID, myData.locationID, newDrink, myData.current, myData.required);

      myObject.addDrink(newInventoryItem);

    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });
  }

  public deleteObject() {
    for (const item of this._items) {
      item.deleteObject()
    }
  }

  /* deleteInventoryItem
    Description: Tries to find inventory item within inventory and delete it.

    IN: InventoryItem
    OUT: void
  */
  public deleteInventoryItem(toDelete: Drink): void {

    let index: number = 0

    for (const item of this._items) {
      if (toDelete === item.drinkType) {
        item.deleteObject();
        this.items.splice(index, 1);
        break;
      }
      index += 1;
    }

  }


}
