<template>
  <div class="home">
    <h1>Welcome to my Nightclub: {{this.myClub.name}}</h1>

    <div style="position: absolute; margin-top: 10px; margin-left: 20px; top: 0; left: 0;">
      Tooltips:
      <el-switch v-model="tooltipDisabled" inactive-color="#13ce66" active-color="#ff4949">
      </el-switch>
    </div>




    <!-- Backroom Section -->
    <el-row :gutter="10" type="flex" justify="center" >
      <el-col :span="18">
        <div style="background-color: #8ac7db;">
          <h2>Backroom Stock:</h2>
          <el-row :gutter="20" type="flex" justify="center">
              <AddDrink :inventory="this.myClub.overstock" :overstock="[]" :locationID="this.myClub.locationID" :addingToBar="false"></AddDrink>
              <EditStock :inventory="this.myClub.overstock" :inventoryOwnerName="this.myClub.name" v-on:deletedDrink="deleteOverstockItem($event)"></EditStock>
              <el-button type="warning" @click="goShopping"  v-if="this.myClub.overstock.calculateStock().length > 0">
                <span>Go Shopping</span>
              </el-button>
          </el-row>
          <br>
          <el-row :gutter="20" type="flex" justify="center" >
            <el-col :span="8">
              <div style="background-color: #DCDFE6;" class="grid-content bg-purple">
                <h3>Current Stock:</h3>
                <el-row type="flex" justify="center" v-for="inventoryItem in this.myClub.overstock.items" :key="inventoryItem.drinkType">
                  <el-col :span="2"/>
                  <el-col :span="10">
                    <div style="margin: 0; position: absolute; bottom: 10%; right:60%">
                      {{inventoryItem.drinkType.name}}
                    </div>
                  </el-col>
                    <el-col :span="10">
                      <span style="font-size: 30px;">
                        {{inventoryItem.currentStock}}
                      </span>/{{inventoryItem.requiredStock}}
                    </el-col>
                  <el-col :span="2"/>
                </el-row>
                <span v-if="this.myClub.overstock.items.length == 0">No Drinks in the system.</span>
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

    <el-button type="primary" @click="barFormVisible = true">Add New Bar</el-button>
    <br>
    <br>

    <!-- BARS SECTION -->
    <el-row :gutter="20">
      <el-col style="margin-bottom: 20px;" :span="8" v-for="(bar, barIndex) in this.myClub.bars" :key="bar.name">
        <div style="background-color: lightblue;" class="grid-content bg-purple">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="2">
              <div style="align: middle;">
                <!-- <el-button type="info" @click="deleteBar(bar, barIndex)"><i class="el-icon-delete"></i></el-button> -->
                <EditLocation :location="bar" :isClub="false" v-on:deleteBar="deleteBar(bar, barIndex)"></EditLocation>
              </div>
            </el-col>
            <el-col :span="8" >
              <div style="text-align: left;">
                <h1>{{bar.name}}</h1>
              </div>
            </el-col>
            <el-col :span="8">
            </el-col>

          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
              <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Click Button to Add a drink to the bar" placement="top">
                <AddDrink :inventory="bar.inventory" :drinkList="bar.overstock.getDrinkList()" :locationID="bar.locationID" :addingToBar="true"></AddDrink>
              </el-tooltip>
            </el-col>
            <el-col :span="12">
              <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Changes Current and Required Stock" placement="top">
                <EditStock :inventory="bar.inventory" :inventoryOwnerName="bar.name" v-on:deletedDrink="displayDeletedDrink($event)"></EditStock>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="height: match-parent">
              <div style="background-color: #DCDFE6;" class="grid-content bg-purple">
                <h3>Current Stock:</h3>
                <el-row type="flex" justify="center" v-for="inventoryItem in bar.inventory.items" :key="inventoryItem.drinkType">
                  <el-col :span="2"/>
                  <el-col :span="10">
                    <div style="margin: 0; position: absolute; bottom: 10%; right:60%">
                      {{inventoryItem.drinkType.name}}
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <span style="font-size: 30px;">
                      {{inventoryItem.currentStock}}
                    </span>/{{inventoryItem.requiredStock}}
                  </el-col>

                  <button type="button" name="button" @click="drink(inventoryItem)">drink</button>

                  <el-col :span="2"/>
                </el-row>
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
import EditLocation from '@/components/EditLocation.vue'; // @ is an alias to /src

import Club from '@/classes/Club.ts'; // @ is an alias to /src
import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
    AddDrink,
    EditStock,
    EditLocation,
  },
})
export default class Home extends Vue {

  @Prop() private myClub !: Club;

  private formLabelWidth: string;
  private newBarName: string;
  private barFormVisible: boolean;
  private tooltipDisabled: boolean;
  private preloadVisible: boolean;

  constructor() {
    super();

    this.formLabelWidth = '';
    this.newBarName = '';
    this.barFormVisible = false;
    this.tooltipDisabled = false;
    this.preloadVisible = true;

  }

  public createBar(): void {

    const payload = {name: this.newBarName, overstock: 0};

    alert("Creating bar")

    const vueObject = this;

    axios.post('http://127.0.0.1:5000/locations', payload).then((response) => {
    // axios.post('http://24.138.161.30:5000/locations', payload).then((response) => {
      console.log(response.data);
      const myData = response.data[0];

      const newBar = new Bar(myData.locationID, myData.name, new Inventory([]), vueObject.myClub.overstock);

      vueObject.myClub.addBar(newBar);

    }).catch((e) => {
        console.log('request failed');
        console.log(e);
    });
  }

  public goShopping(): void {
    this.myClub.overstock.resetStock();
  }

  public deleteBar(myBar: Bar, barIndex: number): void {
    console.log("DELETING BAR");

    myBar.deleteObject();

    this.myClub.bars.splice(barIndex,1);
  }

  public displayDeletedDrink(deletedDrink: Drink){
    console.log("Deleted Stock of Drink:");
    console.log(deletedDrink)
  }

  public deleteOverstockItem(toDelete: Drink){
    this.myClub.deleteOverstockItem(toDelete);
    this.displayDeletedDrink(toDelete);
  }

  public drink(inventoryItem: InventoryItem): void {
    // const myDrink = inventoryItem.drinkType;
    inventoryItem.decrementStock();

  }
}
</script>
