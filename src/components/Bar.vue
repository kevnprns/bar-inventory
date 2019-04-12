<template lang="html">
  <div class="Bar">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Bar from '@/classes/Bar.ts'; // @ is an alias to /src

@Component
export default class EditLocation extends Vue {
  @Prop() private myBar!: Bar;
  @Prop() private isClub!: boolean;
  private editFormVisible: boolean;
  private editName: string;

  constructor() {
    super();
    this.editFormVisible = false;
    this.editName = "";
  }

  public setVariables(): void {
    // this.editName = this.location.name;
  }

}
</script>

<style lang="css" scoped>
</style>
