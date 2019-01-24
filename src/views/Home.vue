<template>
  <div class="home">
    <h1>Welcome to my Nightclub: {{this.myClub.name}}</h1>
    <el-button v-if="preloadVisible" type="info" @click="preloadValues">Add Preload Values</el-button>

    <!-- Creating a Bar Form -->
    <el-dialog title="Create Bar"  :visible.sync="barFormVisible">
      <el-form @keyup.enter="this.createBar()">
        <el-form-item label="Bar Name" :label-width="formLabelWidth">
          <el-input v-model="newBarName" autocomplete="off" @keyup.enter="this.createBar()"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="barFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="barFormVisible = false; createBar()">Confirm</el-button>
      </span>
    </el-dialog>


    <!-- Backroom Section -->
    <el-row :gutter="10" type="flex" justify="center" >
      <el-col :span="18">
        <div style="background-color: #8ac7db;">
          <h2>Backroom Stock:</h2>
          <el-row :gutter="20" type="flex" justify="center">
              <AddDrink :inventory="this.myClub.overstock" :overstock="[]" :addingToBar="false"></AddDrink>
              <EditStock :inventory="this.myClub.overstock" :inventoryOwnerName="this.myClub.name"></EditStock>
              <el-button type="warning" @click="goShopping"  v-if="this.myClub.overstock.calculateStock().length > 0">
                <span>Go Shopping</span>
              </el-button>
          </el-row>
          <br>
          <el-row :gutter="20" type="flex" justify="center" >
            <el-col :span="6">
              <div style="background-color: #DCDFE6;" class="grid-content bg-purple">
                <h3>Current Stock:</h3>
                <el-row type="flex" justify="center" v-for="inventoryItem in this.myClub.overstock.items" :key="inventoryItem.drinkType">
                  <el-col :span="2"/>
                  <el-col :span="10">
                    {{inventoryItem.drinkType.name}}
                  </el-col>
                  <div style="border-style: inset; padding-left: 4px; padding-right: 4px;">
                    <el-col :span="10">
                      {{inventoryItem.currentStock}}
                    </el-col>
                  </div>
                  <el-col :span="2"/>
                </el-row>
                <span v-if="this.myClub.overstock.items.length == 0">No Drinks in the system.</span>
                <br>
              </div>
            </el-col>
            <el-col :span="6"  >
              <div style="background-color: #C0C4CC;" class="grid-content bg-purple">
                <h3>Needs:</h3>
                <div class="">
                  <el-row type="flex" justify="center" v-for="inventoryItem in this.myClub.overstock.calculateStock()" :key="inventoryItem.drinkType">
                    <el-col :span="2"/>
                    <el-col :span="10">
                      {{inventoryItem.drinkType.name}}
                    </el-col>
                    <div style="border-style: inset; padding-left: 4px; padding-right: 4px;">
                      <el-col :span="10">
                        {{inventoryItem.requiredStock}}
                      </el-col>
                    </div>
                    <el-col :span="2"/>
                  </el-row>
                </div>
                <span v-if="this.myClub.overstock.calculateStock().length == 0">Fully Stocked</span>

                <br>
              </div>

            </el-col>
          </el-row>
          <br>
        </div>
      </el-col>
    </el-row>
    <br>
    <h1>My Bars:</h1>
    <el-button type="primary" @click="barFormVisible = true">Add New Bar</el-button>
    <br>
    <br>
    <el-row :gutter="20">
      <el-col :span="6" v-for="bar in this.myClub.bars" :key="bar.name">
        <div style="background-color: lightblue;" class="grid-content bg-purple">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
              <h1>{{bar.name}}</h1>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="8">
              <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Click Button to Add a drink to the bar" placement="top">
                <AddDrink :inventory="bar.inventory" :drinkList="bar.overstock.getDrinkList()" :addingToBar="true"></AddDrink>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Changes Current and Required Stock" placement="top">
                <EditStock :inventory="bar.inventory" :inventoryOwnerName="bar.name"></EditStock>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Replenishes Stock from the Backroom" placement="top">
                <el-button v-if="bar.inventory.calculateStock().length > 0" type="warning" @click="restockBar(bar)">Restock Bar</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="height: match-parent">
              <div style="background-color: #DCDFE6;" class="grid-content bg-purple">
                <h3>Current Stock:</h3>
                <el-row type="flex" justify="center" v-for="inventoryItem in bar.inventory.items" :key="inventoryItem.drinkType">
                  <el-col :span="2"/>
                  <el-col :span="10">
                    {{inventoryItem.drinkType.name}}
                  </el-col>
                  <div style="border-style: inset;">
                    <el-col :span="10">
                      {{inventoryItem.currentStock}}
                      <button type="button" name="button" @click="drink(inventoryItem)">drink</button>
                    </el-col>
                  </div>
                  <el-col :span="2"/>
                </el-row>
                <br>
              </div>


            </el-col>
            <el-col :span="12" style="height: 100px">
              <div style="background-color: #C0C4CC;" class="grid-content bg-purple">
                <h3>Needs:</h3>
                <el-row type="flex" justify="center" v-for="inventoryItem in bar.inventory.calculateStock() " :key="inventoryItem.drinkType">
                  <el-col :span="2"/>
                  <el-col :span="10">
                    {{inventoryItem.drinkType.name}}
                  </el-col>

                  <div style="border-style: inset; padding-left: 4px; padding-right: 4px;">
                    <el-col :span="10">
                      {{inventoryItem.requiredStock}}
                    </el-col>
                  </div>
                  <el-col :span="2"/>
                </el-row>
                <div v-if="bar.inventory.calculateStock().length == 0">
                  Fully Stocked
                  <br>
                  <br>
                </div>
                <br>
              </div>

            </el-col>
          </el-row>

        </div>
      </el-col>

    </el-row>
    <br>
    <br>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddDrink from '@/components/AddDrink.vue'; // @ is an alias to /src
import EditStock from '@/components/EditStock.vue'; // @ is an alias to /src

import Club from '@/classes/Club.ts'; // @ is an alias to /src
import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src

@Component({
  components: {
    AddDrink,
    EditStock,
  },
})
export default class Home extends Vue {

  // @Prop() private msg!: string;
  @Prop() private myClub !: Club;

  private formLabelWidth: string;
  private newBarName: string;
  private preloadedBars: string[];
  private preloadedDrinks: string[];
  private preloadedDrinkDescriptions: string[];
  private barFormVisible: boolean;
  private tooltipDisabled: boolean;
  private preloadVisible: boolean;

  constructor() {
    super();

    this.formLabelWidth = '';
    this.newBarName = '';
    this.preloadedBars = ['MainRoom', 'LatinBar', 'Saloon'];
    this.preloadedDrinks =
    ['Jack Daniels', 'Smirnoff Vodka', 'BullDog Gin', 'Bombay Saphire', 'Bacardi Limon'];
    this.preloadedDrinkDescriptions =
    ['Hearty Tenesse Whiskey', 'Cheapest Vodka money can buy', 'Considered one of the best gins',
    'Very premium Gin', 'Rum that has flavour'];
    this.barFormVisible = false;
    this.tooltipDisabled = false;
    this.preloadVisible = true;
  }

  public preloadValues(): void {
    this.preloadVisible = false;
    let i = 0;
    for (const drink of this.preloadedDrinks) {
      const newDrink = new Drink(drink, this.preloadedDrinkDescriptions[i], 1);
      this.myClub.overstock.addDrink(newDrink, 12, 3);
      i++;
    }

    const drinkList = this.myClub.overstock.items;
    i = 0;
    for (const barName of this.preloadedBars) {
      const newBar = new Bar(barName, new Inventory([]), this.myClub.overstock);
      newBar.inventory.addDrink(drinkList[i].drinkType, 1, i);
      this.myClub.addBar(newBar);
      i++;
    }
  }

  public createBar(): void {
    const newBar = new Bar(this.newBarName, new Inventory([]), this.myClub.overstock);
    this.myClub.addBar(newBar);
  }

  public restockBar(myBar: Bar): void {
    myBar.stockBar();
  }

  public goShopping(): void {
    this.myClub.overstock.resetStock();
  }

  public drink(inventoryItem: InventoryItem): void {
    inventoryItem.decrementStock();
  }
}
</script>
