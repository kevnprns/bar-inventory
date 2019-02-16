import Bar from '@/classes/Bar.ts';
import Inventory from '@/classes/Inventory.ts';

export default class Club {
  private _locationID: number;
  private _name: string;
  private _bars: Bar[];
  private _overstock: Inventory;

  constructor(locationID: number, newName: string, newBars: Bar[], newOverstock: Inventory) {
    this._locationID = locationID;
    this._name = newName;
    this._bars = newBars;
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
    this._bars.push(newBar);
  }
}
