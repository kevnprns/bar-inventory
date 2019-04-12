import Inventory from '@/classes/Inventory.ts';
import InventoryItem from '@/classes/InventoryItem.ts';
import axios from 'axios';

export default class Bar {
  private _locationID: number;
  private _name: string;
  private _inventory: Inventory;
  private _overstock: Inventory;

  constructor(locationID: number, newName: string, newInventory: Inventory, newOverstock: Inventory) {
    this._locationID = locationID;
    this._name = newName;
    this._inventory = newInventory;
    this._overstock = newOverstock;
  }

  // accessors && mutators
  get locationID(): number {
    return this._locationID;
  }
  set locationID(locationID: number) {
    this._locationID = locationID;
  }
  get name(): string {
    return this._name;
  }

  // setter is altered to perform an asyncronous update on the name
  set name(newName: string) {

    const myObject = this;
    const base = 'http://127.0.0.1:5000/locations/' + this.locationID.toString();
    const payload = {name: newName, overstock: 0};
    // const base = 'http://24.138.161.30:5000/locations/' + this.locationID.toString();

    axios.put(base, payload).then((response) => { //waits for a response
      console.log('Updated Bar Name');
      console.log(response.data);
      this._name = newName; // only sets the name if and once the data has been returned.
    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });

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

  public serialize(): string {
    return JSON.stringify(this);
  }

  // methods

  // Stock Bar: gets required stock list,
  //        asks the overstock inventory for all they can give and then adds it to the bars inventory
  public stockBar() {
    const requiredStock: InventoryItem[] = this._inventory.calculateStock();

    const transferableStock: InventoryItem[] = this._overstock.removeStock(requiredStock);

    const transferableJson = [];

    for (const item of transferableStock) {
      transferableJson.push(JSON.parse(item.serialize()));
      item.locationID = this.locationID;
    }

    const payload = transferableJson;

    const myObject = this;
    const base = 'http://127.0.0.1:5000/inventory/remove';

    // const base = 'http://24.138.161.30:5000/inventory/remove';

    axios.put(base, payload).then((response) => {
      console.log('Updated Remove Items Stock');
      console.log(response.data);
      myObject._inventory.addStock(transferableStock);

    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });

  }

  public deleteObject() {
    this.inventory.deleteObject();

    const myObject = this;
    const base = 'http://127.0.0.1:5000/locations/' + this.locationID.toString();
    // const base = 'http://24.138.161.30:5000/locations/' + this.locationID.toString();

    axios.delete(base).then((response) => {
      console.log('Deleted location #' + this.locationID.toString());
      console.log(response.data);
    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });
  }

}
