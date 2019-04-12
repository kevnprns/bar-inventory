<template>
  <div class="home">
    <h1>Chosen Bar:</h1>
    <el-select v-model="currentBar" @change="updateList()">
      <el-option
        v-for="(item, index) in myClub.bars"
        :key="index"
        :label="item.name"
        :value="index">
      </el-option>
    </el-select>


    <el-table
    :data="currentInventory"
    style="width: 100%">
    <el-table-column
      type="index"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="Quantity">
    </el-table-column>
    <el-table-column
      prop="stock"
      label="Current Stock">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="200">
      <template slot-scope="scope">
        <el-button type="primary" @click="changeStock(scope.$index, -1);"><i class="el-icon-minus"></i></el-button>
        <el-button type="primary" @click="changeStock(scope.$index, 1);"><i class="el-icon-plus"></i></el-button>
      </template>
    </el-table-column>


  </el-table>
<br>
  <el-button type="info" :disabled="this.upToDate" @click="updateList()">Reset Values</el-button>
  <el-button type="primary" :disabled="this.upToDate" @click="submitChanges()">Update</el-button>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import EditStock from '@/components/EditStock.vue'; // @ is an alias to /src

import Club from '@/classes/Club.ts'; // @ is an alias to /src
import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src

@Component({
  components: {
    EditStock,
  },
})
export default class Bartender extends Vue {

  @Prop() private myClub !: Club;

  private currentBar : number;
  private upToDate : boolean;
  private currentInventory : any[];
  private allInventory : any[];

  constructor() {
    super();

    this.currentBar = 0;
    this.upToDate = true;
    this.currentInventory = [];
    this.allInventory = [];

  }

  public mounted() {
    this.loadList();
  }

  public updateList(): void {
    this.upToDate = true;
    this.currentInventory = [];
    const selectedBar = this.allInventory[this.currentBar];

    for(const item of selectedBar) {
      this.currentInventory.push({name: item.name, quantity: item.quantity, stock: item.stock})
    }

  }

  public checkStock() {
    const selectedInventory = this.allInventory[this.currentBar];
    var check = true;

    var i: number = 0;


    for(const item of selectedInventory) {
      if(item.stock != this.currentInventory[i].stock) {
        check = false;
      }

      i += 1;
    }

    this.upToDate = check;
  }

  public changeStock(index :number, toAdd :number) {
    this.currentInventory[index].stock += toAdd;

    this.checkStock();
  }

  public submitChanges() {
    const myBar = this.myClub.bars[this.currentBar];
    var i = 0;

    for (const item of myBar.inventory.items) {
      item.updateStock(this.currentInventory[i].stock, item.requiredStock);
      i++;
    }

    this.allInventory[this.currentBar] = this.currentInventory;

    this.upToDate = true;

  }


  public loadList(): void {


    for(const bar of this.myClub.bars){
      const newList: any[] = [];

      for(const item of bar.inventory.items){
        newList.push({name: item.drinkType.name, quantity: item.drinkType.quantity, stock: item.currentStock});
      }
      this.allInventory.push(newList);
    }

    this.updateList();
  }

}
</script>
