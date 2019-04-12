<template>
  <div class="home">
    <h1>To ReStock:</h1>

    <!-- BARS SECTION -->
    <el-row :gutter="20">
      <el-col style="margin-bottom: 20px;" :span="8" v-for="(bar, barIndex) in this.myClub.bars" :key="bar.name">
        <div style="background-color: lightblue;" class="grid-content bg-purple">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="2">
            </el-col>
            <el-col :span="8">
              <h1>{{bar.name}}</h1>
            </el-col>
            <el-col :span="12">
            </el-col>

          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="10">
              <!-- <el-tooltip :disabled="tooltipDisabled" class="item" effect="dark" content="Replenishes Stock from the Backroom" placement="top"> -->
                <el-button :disabled="bar.inventory.calculateStock().length == 0" type="warning" @click="restockBar(bar)">Restock Bar</el-button>
              <!-- </el-tooltip> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col style="height: 100px">
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

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Club from '@/classes/Club.ts'; // @ is an alias to /src
import Bar from '@/classes/Bar.ts'; // @ is an alias to /src
import Drink from '@/classes/Drink.ts'; // @ is an alias to /src
import Inventory from '@/classes/Inventory.ts'; // @ is an alias to /src
import InventoryItem from '@/classes/InventoryItem.ts'; // @ is an alias to /src

@Component({
  components: {
  },
})
export default class Barback extends Vue {

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
  }

  public restockBar(myBar: Bar): void {
    myBar.stockBar();
  }
}
</script>
