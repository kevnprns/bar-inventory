<template>
  <div class="About">
    <h1>Welcome to Inventory Management</h1>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <p>This application's purpose is to demonstrate basic OO concepts through inventory management
          You are in charge of a nightclub in which you sell a variety of drinks at different bars throughout the establishement.
        </p>

        <div style="background-color: #EBEEF5;">

          <h3>Bar Info</h3>
          <p>
            Each Bar sells its own set of drinks.
          </p>
          <p>All bar drinks are brought in from the nightclubs main inventory, the BACKROOM

          </p>
          <p>Each drink at the bar has a minimum requirement stock</p>
          <br>
          <h3>Restocking Bars</h3>
          <p>Once the stock of that drink drops below the minumum, the bar displays the number of drinks required to restock the bar.
            You may restock the bar through the use of the yellow restock button.
          </p>
          <p>Each bar gets its adds its drinks from the Backroom inventory</p>
          <p>The bar brings in as many drinks from the backroom as it can.</p>
          <br>

          <h3>Backroom Inventory</h3>
          <p>The backroom functions as the nightclubs main inventory where all the drinks are stored after purchase.</p>
          <p>This inventory functions similarly to the bars with the exception that it can add new drinks to the system</p>
        </div>

      </el-col>
    </el-row>


  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Drink, Inventory, InventoryItem} from '@/classes/BarClasses.ts'; // @ is an alias to /src

@Component
export default class DrinkList extends Vue {
    public enthusiasm = 1;

    public increment() {
        this.enthusiasm++;
    }
    public decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }
    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
</script>
