<template>
  <div class="editStock">
    <el-button v-if="this.inventory.items.length > 0" type="danger" @click="editFormVisible = true; setList();">
      <span>Edit Stock</span>
    </el-button>

    <el-dialog :title="'Edit Inventory for: '+this.inventoryOwnerName" :visible.sync="editFormVisible">
      <el-row>
        <el-col :span="14">
          <el-row>
            <el-col :span="7">
              <h4></h4>
            </el-col>
            <el-col :span="17">
              <h4>Current</h4>
            </el-col>
          </el-row>
          <el-form label-position="right">
            <el-form-item v-for="(item, index) in currentStock" :label="drinkNames[index]" :key="item" label-width="30%">
              <el-input-number v-model="currentStock[index]" autocomplete="off"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <h4>Minumum Required</h4>
          <el-form label-position="right">
            <el-form-item v-for="(item, index) in requiredStock" label="" :key="item" :label-width="formLabelWidth">
              <el-input-number v-model="requiredStock[index]" autocomplete="off"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editFormVisible = false; editDrinks()">Confirm</el-button>
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
export default class EditStock extends Vue {
  @Prop() private inventory!: Inventory;
  @Prop() private inventoryOwnerName!: string;
  // @Prop() private addingToBar!: boolean;

  private formLabelWidth: string;
  private editFormVisible: boolean;
  private currentStock: number[];
  private requiredStock: number[];
  private drinkNames: string[];

  constructor() {
    super();
    this.formLabelWidth = '0px';
    this.editFormVisible = false;
    this.currentStock = [];
    this.requiredStock = [];
    this.drinkNames = [];

    this.setList();
  }

  // sets the form numbers from the InventoryItem objects
  public setList(): void {

    this.currentStock = [];
    this.requiredStock = [];
    this.drinkNames = [];

    for (const item of this.inventory.items) {
      this.drinkNames.push(item.drinkType.name);
      this.currentStock.push(item.currentStock);
      this.requiredStock.push(item.requiredStock);
    }
  }

  // takes form numbers and updates the InventoryItem objects
  public editDrinks(): void {
    let i = 0;
    for (const item of this.inventory.items) {
      item.currentStock = this.currentStock[i];
      item.requiredStock = this.requiredStock[i];
      i++;
    }
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
