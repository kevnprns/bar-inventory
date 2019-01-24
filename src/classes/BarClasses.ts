export class Drink {

  private name: string;
  private description: string;
  private quantity: number;

  constructor(newName: string, newDescription: string, newQuantity: number) {
    this.name = newName;
    this.description = newDescription;
    this.quantity = newQuantity;
  }

  // accessors
  public getName() {
    return this.name;
  }
  public getDescription() {
    return this.description;
  }
  public getQuantity() {
    return this.quantity;
  }
  // mutators
  public setName(newName: string) {
    this.name = newName;
  }
  public setDescription(newDescription: string) {
    this.description = newDescription;
  }
  public setQuantity(newQuantity: number) {
    this.quantity = newQuantity;
  }
}

export class Bar {
  private name: string;
  private inventory: Inventory;
  private overstock: Inventory;

  constructor(newName: string, newInventory: Inventory, newOverstock: Inventory) {
    this.name = newName;
    this.inventory = newInventory;
    this.overstock = newOverstock;
  }

  // accessors
  public getName() {
    return this.name;
  }
  public getInventory() {
    return this.inventory;
  }
  public getOverstock() {
    return this.overstock;
  }
  // mutators
  public setName(newName: string) {
    this.name = newName;
  }
  public setInventory(newInventory: Inventory) {
    this.inventory = newInventory;
  }
  public setOverstock(newOverstock: Inventory) {
    this.overstock = newOverstock;
  }

  // methods

  // Stock Bar: gets required stock list,
  //        asks the overstock inventory for all they can give and then adds it to the bars inventory
  public stockBar() {
    const requiredStock = this.inventory.calculateStock();

    const transferableStock = this.overstock.removeStock(requiredStock);

    this.inventory.addStock(transferableStock);
  }

}

export class Club {
  private name: string;
  private bars: Bar[];
  private overstock: Inventory;

  constructor(newName: string, newBars: Bar[], newOverstock: Inventory) {
    this.name = newName;
    this.bars = newBars;
    this.overstock = newOverstock;
  }

  // accessors
  public getName(): string {
    return this.name;
  }
  public getBars(): Bar[] {
    return this.bars;
  }
  public getOverstock(): Inventory {
    return this.overstock;
  }
  // mutators
  public setName(newName: string): void {
    this.name = newName;
  }
  public setBars(newBars: Bar[]): void {
    this.bars = newBars;
  }
  public setOverstock(newOverstock: Inventory): void {
    this.overstock = newOverstock;
  }


  /* addBar
    Description: Takes Bar and adds it to the Club Object

    In: Bar
    Out: void
  */
  public addBar(newBar: Bar): void {
    this.bars.push(newBar);
  }
}

export class Inventory {
  private items: InventoryItem[];
  constructor(newItems: InventoryItem[]) {
    this.items = newItems;
  }

  // accessors
  public getItems() {
    return this.items;
  }
  // mutators
  public setItems(newItems: InventoryItem[]) {
    this.items = newItems;
  }

  /* addDrink
    Description: Takes a drink and stock values and creates a InventoryItem to be added.

    In: Drink, number, number
    Out: void
  */
  public addDrink(drinkType: Drink, currentStock: number, requiredStock: number): void {
    // does not check if Drink already exists
    const newItem = new InventoryItem(drinkType, currentStock, requiredStock);
    this.items.push(newItem);
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

    for (const item of this.items) {
      const diff = item.getRequiredStock() - item.getCurrentStock();
      if (diff > 0) {
        requiredStock.push(new InventoryItem(item.getDrinkType(), 0, diff));
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

    for (const item of this.items) {
      drinkList.push(item.getDrinkType());
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
      const drinkType = item.getDrinkType();
      const inventoryItem = this.findInventoryItem(drinkType);

      const diff = inventoryItem.getCurrentStock() - item.getRequiredStock();
      if (diff < 0) {
        // cannot fill stock fully
        transferableStock.push(new InventoryItem(drinkType, (item.getRequiredStock() + diff), 0));
        inventoryItem.setCurrentStock(0);
      } else {
        // can fill stock without a problem.
        transferableStock.push(new InventoryItem(drinkType, item.getRequiredStock(), 0));
        inventoryItem.setCurrentStock(diff);
      }
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

    for (const item of transferableStock) {
      const drinkType = item.getDrinkType();
      const inventoryItem = this.findInventoryItem(drinkType);

      inventoryItem.stockItem(item.getCurrentStock());
    }
  }

  /* resetStock
    Description: Loops through Inventory Items and calls topUp() on each Item

    In: void
    Out: void
  */
  public resetStock(): void {
    for (const item of this.items) {
      item.topUp();
    }
  }

  /* findInventoryItem
    Description: Loops through inventory to find specific drink and returns its Inventory Item

    In: Drink
    Out: InventoryItem
  */
  public findInventoryItem(searchDrink: Drink): InventoryItem {

    for (const item of this.items) {
      if (searchDrink === item.getDrinkType()) {
        return item;
      }
    }
    return new InventoryItem(searchDrink, 0, 0);
  }
}


export class InventoryItem {
  private drinkType: Drink;
  private currentStock: number;
  private requiredStock: number;

  constructor(newDrinkType: Drink, newCurrentStock: number, newRequiredStock: number) {
    this.drinkType = newDrinkType;
    this.currentStock = newCurrentStock;
    this.requiredStock = newRequiredStock;
  }

  // Accessors
  public getDrinkType() {
    return this.drinkType;
  }
  public getCurrentStock() {
    return this.currentStock;
  }
  public getRequiredStock() {
    return this.requiredStock;
  }

  // Mutators
  public setDrinkType(newDrinkType: Drink) {
    this.drinkType = newDrinkType;
  }
  public setCurrentStock(newCurrentStock: number) {
    this.currentStock = newCurrentStock;
  }
  public setRequiredStock(newRequiredStock: number) {
    this.requiredStock = newRequiredStock;
  }

  /* stockItem
    Description: Adds number to the objects currentStock

    In: number
    Out: void
  */
  public stockItem(topUpValue: number): void {
    this.currentStock = this.currentStock + topUpValue;
  }

  /* topUp
    Description: Tops up currentStock if it is smaller than the requiredStock

    In: void
    Out: void
  */
  public topUp(): void {
    if (this.currentStock < this.requiredStock) {
      this.currentStock = this.requiredStock;
    }
  }

  /* topUp
    Description: Decrements the currentStock by 1 if it is not already 0
                Used for the drink button in the UI

    In: void
    Out: void
  */
  public decrementStock(): void {
    if (this.currentStock !== 0) {
      this.currentStock--;
    }
  }


}
