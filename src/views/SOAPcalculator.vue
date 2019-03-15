<template>
  <div class="About">
    <h1>Welcome to the SOAP consumable</h1>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <p>This part of the application demonstrastes the use of a soap consumable. Specifically a calculator that adds two numbers and returns the result.
        </p>

        <div style="background-color: #EBEEF5;">
          <el-row>
            <el-col :span="12">
              <el-row>
                  <h4>Integer A</h4>
              </el-row>
              <el-input-number v-model="integerA"></el-input-number>
            </el-col>

            <el-col :span="12">
              <el-row>
                  <h4>Integer B</h4>
              </el-row>
              <el-input-number v-model="integerB"></el-input-number>
            </el-col>
            <!-- <el-col :span="10">
              <h4>Minumum Required</h4>
              <el-form label-position="right">
                <el-form-item v-for="(item, index) in requiredStock" label="" :key="item" :label-width="formLabelWidth">
                  <el-input-number v-model="item.number" autocomplete="off"></el-input-number>
                </el-form-item>
              </el-form>
            </el-col> -->

          </el-row>
          <el-button @click="useSOAP" type="primary" round>Add</el-button>

          <h3>{{this.instruction}}</h3>
          <br>
          <div v-if="this.calculationPerformed">
            <h3>
              {{this.integerA}} + {{this.integerB}}
            </h3>
            <h2>=</h2>
            <h1>{{this.result}}</h1>
          </div>

          <div v-else>
            <h3>No Calculation has been made yet</h3>
          </div>
          <br>


        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class SOAP extends Vue {

    private integerA: number;
    private integerB: number;

    private calculationA: number;
    private calculationB: number;
    private result: number;

    private instruction: string;
    private calculationPerformed: boolean;




    constructor(){
      super();
      this.integerA = 0;
      this.integerB = 0;

      this.calculationA = 0;
      this.calculationB = 0;

      this.result = 0;
      this.instruction = 'hit the button';
      this.calculationPerformed = false;





      // this.useSOAP();

    }

    public enthusiasm = 1;

    public increment() {
        this.enthusiasm++;
    }
    public decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }

    public useSOAP(): void {
      this.calculationA = this.integerA;
      this.calculationB = this.integerB;

      const xmls='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                    <soap:Body>\
                      <Add xmlns="http://tempuri.org/">\
                        <intA>' + this.calculationA.toString() + '</intA><intB>' + this.calculationB.toString() + '</intB>\
                      </Add>\
                    </soap:Body>\
                  </soap:Envelope>'; //creation of the soap ENVELOPE

      const myObject = this;

      this.instruction = "calculating..."

      console.log("Sending to calculator...");
      console.log(xmls);
      // uses the cors anywhere prefix to be able to get past the Access control checks which dont allow localhost
      axios.post('https://cors-anywhere.herokuapp.com/http://www.dneonline.com/calculator.asmx?op=Add', xmls, {headers: {'Content-Type': 'text/xml'} }).then(res=>{
          console.log("returned something");
          console.log(res.data);

          var parseString = require('xml2js').parseString;
          // var xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AddResponse xmlns="http://tempuri.org/"><AddResult>10</AddResult></AddResponse></soap:Body></soap:Envelope>';
          var xml = res.data;
          // xml = xml.substring(xml.indexOf("?>") + 2);
          parseString(xml, {trim: true}, function (err: any, response: any) {
              console.log("Calculation Result");
              myObject.result = response['soap:Envelope']['soap:Body'][0].AddResponse[0].AddResult[0];
              myObject.instruction = "hit the button"
          });
        }).catch(err=>{console.log(err)});

    }
}
</script>
