import axios from 'axios';

export default class Drink {

  private _drinkID: number;
  private _name: string;
  private _description: string;
  private _quantity: number;

  constructor(drinkID: number, newName: string, newDescription: string, newQuantity: number) {

    this._drinkID = drinkID;
    this._name = newName;
    this._description = newDescription;
    this._quantity = newQuantity;

    // this.postDrink();

  }

  // private postDrink(){
  //   const payload = {
  //     name: this.,
  //     description: this.newDrinkDescription,
  //     quantity: this.newDrinkQuantity.toString(),
  //   };
  //
  //   const myObject = this;
  //
  //   axios.post('http://24.138.161.30:5000/drinks', payload).then((response) => {
  //     console.log(response.data);
  //
  //     const myData = response.data[0];
  //
  //
  //     vueObject.addDrink(newDrink);
  //
  //   }).catch((e) => {
  //       console.log('request failed');
  //       console.log(e);
  //   });
  // }

  // accessors && mutators
  get drinkID(): number {
    return this._drinkID;
  }
  set drinkID(drinkID: number) {
    this._drinkID = drinkID;
  }
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
  get description(): string {
    return this._description;
  }
  set description(newDescription: string) {
    this._description = newDescription;
  }
  get quantity(): number {
    return this._quantity;
  }
  set quantity(newQuantity: number) {
    this._quantity = newQuantity;
  }

  public serialize(): string {
    return JSON.stringify(this);
  }

  public deleteObject() {
    const myObject = this;

    const base = 'http://24.138.161.30:5000/drinks/' + this.drinkID.toString();

    axios.delete(base).then((response) => {
      console.log('Deleted Drink #' + myObject.drinkID.toString());
      console.log(response.data);
    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });

  }


}
