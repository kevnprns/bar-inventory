<template>
  <div class="addDrink">
    <el-button type="success" @click="drinkFormVisible = true">
      <span v-if="addingToBar">Add Stock</span>
      <span v-else>Add New Drink</span>
    </el-button>


    <el-dialog title="Add a Drink" :visible.sync="drinkFormVisible">
      <el-row>
        <el-col :span="3"/>
        <el-col :span="18">
          <el-form label-position="right">
            <div class="" v-if="addingToBar">
              <el-form-item  label="Select Drink" :label-width="formLabelWidth">
                <el-select v-model="selectedDrink" placeholder="Select">
                  <el-option
                    v-for="(item, index) in drinkList"
                    :key="index"
                    :label="item.name"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="newDrinkName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="newDrinkDescription" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Quantity" :label-width="formLabelWidth">
                <el-input-number v-model="newDrinkQuantity" autocomplete="off"></el-input-number>
              </el-form-item>
            </div>


            <br><br>
            <el-form-item label="Current Stock" :label-width="formLabelWidth">
              <el-input-number v-model="newCurrentStock" autocomplete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="Minumum Required Stock" :label-width="formLabelWidth">
              <el-input-number v-model="newRequiredStock" autocomplete="off"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3"/>
      </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="drinkFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="drinkFormVisible = false; addDrink()">Confirm</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src

@Component
export default class AddDrink extends Vue {
  @Prop() private inventory!: Inventory;
  @Prop() private drinkList!: Drink[];
  @Prop() private addingToBar!: boolean;
  private formLabelWidth: string;
  private newDrinkName: string;
  private newDrinkDescription: string;
  private newDrinkQuantity: number;
  private newCurrentStock: number;
  private newRequiredStock: number;
  private selectedDrink: number;
  private drinkFormVisible: boolean;

  constructor() {
    super();
    this.formLabelWidth = '200px';
    this.selectedDrink = NaN;
    this.newDrinkName = '';
    this.newDrinkDescription = '';
    this.newDrinkQuantity = 1;
    this.newCurrentStock = 1;
    this.newRequiredStock = 1;
    this.drinkFormVisible = false;
  }

  // takes form inputs and creates a drink
  public addDrink(): void {
    let newDrink: Drink;

    if (!this.addingToBar) {
      newDrink = new Drink(this.newDrinkName, this.newDrinkDescription, this.newDrinkQuantity);
    } else {
      newDrink = this.drinkList[this.selectedDrink];
    }
    this.inventory.addDrink(newDrink, this.newCurrentStock, this.newRequiredStock);
    this.resetValues();
  }

  public resetValues(): void {
    // window.alert(this.newDrink.getName());

    this.newDrinkName = '';
    this.newDrinkDescription = '';
    this.newDrinkQuantity = 1;
    this.newRequiredStock = 1;
    this.newCurrentStock = 1;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
