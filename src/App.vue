<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Manager</router-link> |
      <router-link to="/bartender">Bartender</router-link> |
      <router-link to="/barback">Barback</router-link> |
      <router-link to="/readme">READ.ME</router-link>
    </div>
    <router-view v-if="dataLoaded" :myClub="this.myClub"/>
    <h3 v-else>
      View not loaded
    </h3>
    <!-- <h1>{{this.myClub}}</h1> -->

    <!-- <bar-loader class="custom-class" :color="#bada55" :loading="!dataLoaded" :size="150" :sizeUnit="px"></bar-loader> -->
    <div uk-spinner></div>


  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Club from '@/classes/Club.ts'; // @ is an alias to /src
  import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
  import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
  import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
  import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src
  import axios from 'axios';
  // import { BarLoader } from '@saeris/vue-spinners';

  interface LocationJSON {
    locationID: number;
    name: string;
    overstock: number;
  }

  interface DrinkJSON {
    drinkID: number;
    name: string;
    description: string;
    quantity: number;
  }

  interface InventoryJSON {
    inventoryID: number;
    drinkID: number;
    locationID: number;
    current: number;
    required: number;
  }

  @Component({
    components: {
      // BarLoader
    },
  })
  export default class App extends Vue {

    public baseUrl: string = 'http://127.0.0.1:5000/';
    // public baseUrl: string = 'http://24.138.161.30:5000/';
    private myClub : Club;
    private dataLoaded: boolean;

    constructor() {
      super();

      const myBase = this.baseUrl;
      this.dataLoaded = false;


      // this.myClub = null;
      // this.myClub = Club.Instance(1, 'Loading...', [], new Inventory([]) );
      this.myClub = Club.Instance;

      let endPoint = 'locations';
      const myObject = this;

      axios.get(myBase + endPoint).then((response) => {
        console.log('Recieved Locations:');
        myObject.loadLocations(response.data);

        endPoint = 'drinks';

        axios.get(myBase + endPoint).then((response) => {
          console.log('Recieved Drinks:');
          console.log(response.data);

          const drinks: DrinkJSON[] = response.data;

          endPoint = 'inventory';

          axios.get(myBase + endPoint).then((response) => {
            console.log('Recieved Inventory:');
            console.log(response.data);

            myObject.loadInventory(drinks, response.data);

          }).catch((e) => {
              console.log('request failed: Inventory');
              console.log(e);
          });
        }).catch((e) => {
            console.log('request failed: Drinks');
            console.log(e);
        });
      }).catch((e) => {
          console.log('request failed: Locations');
          console.log(e);
      });
      // const payload = {name: locationID, drinkID: drinkType.drinkID, current: currentStock, required: requiredStock}
    }

    public loadLocations(myLocations: LocationJSON[]): void {
      const bars: LocationJSON[] = [];
      let clubData: LocationJSON = {locationID: 0, name: '', overstock: 1};

      console.log(myLocations);

      for (const location of myLocations) {
        if (location.overstock === 1) {
          clubData = location;

          this.myClub.locationID = clubData.locationID;
          this.myClub.name = clubData.name;
        } else {
          bars.push(location);
        }
      }

      if (clubData.locationID === 0) {
        console.log('No Club found');
        // create a Club
      }



      for (const bar of bars) {
        const newBar = new Bar(bar.locationID, bar.name, new Inventory([]), this.myClub.overstock);
        this.myClub.addBar(newBar);
      }
    }


    public loadInventory(drinks: DrinkJSON[] , inventoryItems: InventoryJSON[]): void {
      let location = this.myClub.locationID;
      const bars = this.myClub.bars;

      for (const item of inventoryItems) {
        if (item.locationID === location) {
          const newDrink = this.findDrink(drinks, item.drinkID);
          if (newDrink === null) {
            continue;
          }

          const myDrink = new Drink(newDrink.drinkID, newDrink.name, newDrink.description, newDrink.quantity);
          const newItem = new InventoryItem(item.inventoryID, item.locationID, myDrink, item.current, item.required);
          console.log(newItem);

          this.myClub.overstock.addDrink(newItem);
        }
      }

      const drinkList = this.myClub.overstock.getDrinkList();

      for (const bar of bars) {
        location = bar.locationID;

        for (const item of inventoryItems) {
          if (item.locationID === location) {

            const myDrink = this.getDrinkObject(drinkList, item.drinkID);
            if (myDrink === null) {
              continue;
            }

            const newItem = new InventoryItem(item.inventoryID, item.locationID, myDrink, item.current, item.required);
            console.log(newItem);

            bar.inventory.addDrink(newItem);
          }
        }
        console.log(bar);
      }

      this.dataLoaded = true;

    }

    public findDrink(drinks: DrinkJSON[], searchID: number): DrinkJSON | null {
      for (const drink of drinks) {
        if (drink.drinkID === searchID) {
          return drink;
        }
      }

      return null;
    }

    public getDrinkObject(drinkList: Drink[], searchID: number): Drink | null {
      for (const drink of drinkList) {
        if (drink.drinkID === searchID) {
          return drink;
        }
      }

      return null;
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
