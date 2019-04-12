<template lang="html">
  <div class="editStock">
    <div style="align: middle;">
      <el-button type="info" @click="editFormVisible = true; setVariables();">
        <i class="el-icon-edit"></i>
      </el-button>
    </div>
    <el-dialog :title="'Edit Bar: '+this.location.name" :visible.sync="editFormVisible">

      <el-input v-model="editName"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editFormVisible = false; editBar();">Confirm</el-button>
      </span>

      <el-button type="danger" @click="editFormVisible = false; deleteBar();">Delete Bar <i class="el-icon-delete"></i></el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Bar from '@/classes/Bar.ts'; // @ is an alias to /src

@Component
export default class EditLocation extends Vue {
  @Prop() private location!: Bar;
  @Prop() private isClub!: boolean;
  private editFormVisible: boolean;
  private editName: string;

  constructor() {
    super();
    this.editFormVisible = false;
    this.editName = "";
  }

  public setVariables(): void {
    this.editName = this.location.name;
  }

  public editBar(): void {
    this.location.name = this.editName;
  }

  public deleteBar(): void {
    this.$emit('deleteBar');
  }
}
</script>

<style lang="css" scoped>
</style>
