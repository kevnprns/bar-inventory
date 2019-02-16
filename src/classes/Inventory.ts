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
    const requiredStock = [];

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
    const drinkList = [];

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
      const drinkType = item.drinkType;
      const inventoryItem = this.findInventoryItem(drinkType);
      let newCurrentStock = 0;

      const diff = inventoryItem.currentStock - item.requiredStock;
      if (diff < 0) {
        // cannot fill stock fully
        transferableStock.push(new InventoryItem(
          inventoryItem.inventoryID,
          inventoryItem.locationID,
          drinkType,
          (item.requiredStock + diff),
          0,
        ));
        newCurrentStock = 0;
      } else {
        // can fill stock without a problem.
        transferableStock.push(new InventoryItem(
          inventoryItem.inventoryID,
          inventoryItem.locationID,
          drinkType,
          item.requiredStock,
          0,
        ));
        newCurrentStock = diff;
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

    const newJson = JSON.stringify(transferableStock);

    const transferableJson = [];

    for (const item of transferableStock) {
      transferableJson.push(JSON.parse(item.serialize()));
    }

    const payload = transferableJson;
    alert('Adding inventory to bar');
    alert(JSON.stringify(transferableJson));

    const myObject = this;
    const base = 'http://24.138.161.30:5000/inventoryAdd';

    axios.post(base, payload).then((response) => {
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


}
