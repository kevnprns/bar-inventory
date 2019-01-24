import Bar from '@/classes/Bar.ts';
import Inventory from '@/classes/Inventory.ts';

export default class Club {
  private _name: string;
  private _bars: Bar[];
  private _overstock: Inventory;

  constructor(newName: string, newBars: Bar[], newOverstock: Inventory) {
    this._name = newName;
    this._bars = newBars;
    this._overstock = newOverstock;
  }

  // accessors && mutators
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




  /* addBar
    Description: Takes Bar and adds it to the Club Object
    In: Bar
    Out: void
  */
  public addBar(newBar: Bar): void {
    this._bars.push(newBar);
  }
}
