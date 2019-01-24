import Inventory from '@/classes/Inventory.ts';

export default class Bar {
  private _name: string;
  private _inventory: Inventory;
  private _overstock: Inventory;

  constructor(newName: string, newInventory: Inventory, newOverstock: Inventory) {
    this._name = newName;
    this._inventory = newInventory;
    this._overstock = newOverstock;
  }

  // accessors && mutators
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
  get inventory(): Inventory {
    return this._inventory;
  }
  set inventory(newInventory: Inventory) {
    this._inventory = newInventory;
  }
  get overstock(): Inventory {
    return this._overstock;
  }
  set overstock(newOverstock: Inventory) {
    this._overstock = newOverstock;
  }


  // methods

  // Stock Bar: gets required stock list,
  //        asks the overstock inventory for all they can give and then adds it to the bars inventory
  public stockBar() {
    const requiredStock = this._inventory.calculateStock();

    const transferableStock = this._overstock.removeStock(requiredStock);

    this._inventory.addStock(transferableStock);
  }

}
