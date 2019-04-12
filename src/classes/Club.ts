import Bar from '@/classes/Bar.ts';
import Drink from '@/classes/Drink.ts';
import Inventory from '@/classes/Inventory.ts';

export default class Club {

  private static _instance: Club; //the singleton instance to be stored for the Club
  private _locationID: number;
  private _name: string;
  private _bars: Bar[];
  private _overstock: Inventory;

  // the constructor is set to private to only be accessed through the instance get method.
  private constructor(locationID: number, newName: string, newBars: Bar[], newOverstock: Inventory) {
    this._locationID = locationID;
    this._name = newName;
    this._bars = newBars;
    this._overstock = newOverstock;
  }


  // The instance Class acts as a singleton provider.
  // This is the way to create a singleton class in Typescript and is done to ensure that there is only one instance of the class running.
  public static get Instance(): Club {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new Club(NaN, 'newClubName', [], new Inventory([])));
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
  set name(newName: string) {
    this._name = newName;
  }
  get bars(): Bar[] {
    return this._bars;
  }
  set bars(newBars: Bar[]) {
    this._bars = newBars;
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


  /* addBar
    Description: Takes Bar and adds it to the Club Object
    In: Bar
    Out: void
  */
  public addBar(newBar: Bar): void {
    this.bars.push(newBar);
  }

  public deleteOverstockItem(toDelete: Drink): void{
    for(const bar of this.bars){
      bar.inventory.deleteInventoryItem(toDelete);
    }

    toDelete.deleteObject();
  }
}
