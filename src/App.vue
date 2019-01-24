<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">App</router-link> |
      <router-link to="/readme">READ.ME</router-link>
    </div>
    <router-view :myClub="this.myClub"/>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Club from '@/classes/Club.ts'; // @ is an alias to /src
  import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
  import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
  import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
  import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src

  @Component
  export default class App extends Vue {

    private myClub: Club;

    constructor() {
      super();
      this.myClub = new Club('Palace', [], new Inventory([]) );
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
