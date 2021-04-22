<template>

<div id="app">
    <side-bar></side-bar>
    <div id="content">
    <div class="title-wrapper">
      <span class="title">처리 현황 통계</span>
    </div>
    <div class="select-condition">
      <table class="condition-table">
          <colgroup>
            <col width="15%">
          </colgroup>
          <tbody>
            <tr class="condition-table-body">
              <td>검색기간</td>
              <td>
                <!-- <input type="text" class='datepicker-here'  v-model="firstDate"  data-timepicker="true" data-language='ko'  timeFormat= "hh:ii"/> ~
        <input type="text" class='datepicker-here'  v-model="lastDate"  data-timepicker="true" data-language='ko'  timeFormat= "hh:ii aa"/> -->
        <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>

        <!-- {{firstDate + " " + firstTime}}
        {{lastDate + " " + lastTime}} -->
              </td>
            </tr>
            <tr class="condition-table-body">
              <td>CCTV</td>
              <td>
                <select name="selectingCCTV" v-model="cctvId">
                  <option v-for="(cctvs, index) in getCCTVs" :key="index" v-bind:value="cctvs.id">
                    {{cctvs.cctv + cctvs.id}}
                  </option>
                </select>
                <button class="button-add" v-on:click="addCCTV(cctvId)">추가</button>

              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <span v-for="(cctv,index) in cctvsNameArr" :key="cctv">
        {{cctv}}
        <span class="cctvRemove" type="button" v-on:click="removeCCTV(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>
                <!-- <span class="groupbutton">
                    CCTV1
                    <span class="groupremove" type="button">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span>
                <span class="groupbutton">
                    CCTV2
                    <span class="groupremove" type="button">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span> -->
              </td>
            </tr>
            <tr class="condition-table-body">
              <td>관제사</td>
              <td>
                <select name="selectingCCTV" v-model="controllerId" >
                  <option v-for="(controllers, index) in getControllers" :key="index" v-bind:value="controllers.id">
                    {{controllers.firstName + controllers.lastName + controllers.id}}
                  </option>
                </select>
                <button class="button-add" v-on:click="addController(controllerId)">추가</button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <span v-for="(controller, index) in controllersNameArr"  :key="index" >
        {{controller}}
        <span class="cctvRemove" type="button" v-on:click="removeController(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>
                <!-- <span class="groupbutton">
                  김태겸124
                  <span class="groupremove" type="button">
                    <i class="closeBtn fas fa-times"></i>
                  </span>
                </span> -->
              </td>
              </tr>
          </tbody>
        </table>
        <div class="searchBtn">
            <button class="button-cancle" v-on:click="makeExcelFile()">내보내기</button>
            <button class="button-add" v-on:click="searchProcess()">조회</button>
        </div>
    </div>


    <div class="content-result">
        <table class="table1">
          <colgroup>
                <col width="200px">
                <col width="200px">
                <col width="200px">
                <col width="150px">
                <col width="600px">
            </colgroup>
            <thead>
                <tr class="table1-head-title">
                    <th>CCTV</th>
                    <th>관제사</th>
                    <th>이벤트 타입</th>
                    <th>처리 상황</th>
                    <th>합계</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table1-body" v-for="(value,index) in printProcess" :key="index">
                   <td>{{value.cctvName}}</td>
                    <td>{{value.controller}}</td>
                    <td>{{value.eventType}}</td>
                    <td>{{value.processSitu}}</td>
                    <td rowspan="10">
                      <!-- <pie-chart  :data="chartData" :options="chartOptions"></pie-chart> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>

</div>
</template>


<script>
import Xlsx from 'xlsx'
import PieChart from './PieChart'
import SideBar from '../../common/SideBar.vue'

export default {
    // name:"ProceStatus",
    components:{
        PieChart,
        SideBar

    },
    data(){
        return{
            firstDate:'',
            lastDate:'',
            firstTime:'',
            lastTime:'',
            dd:[],
            cctvId:'',
            cctvsIdArr:[],
            cctvsNameArr:[],
            controllerId:'',
            controllersIdArr:[],
            controllersNameArr:[],
            controllers:[],
            searchProcessCCTVArr:[],
            searchProcessControllerArr:[],
            getCCTVs:[],
            getControllers:[],
            printProcess:[],
            saveCid: [],


            showChart:false,
                        //vue-chart.js
            chartData:{
               show: true,
               hoverBackgroundColor: "red",
               hoverBorderWidth: 10,
               labels: ["이상없음", "미처리","오탐","화재"],
               datasets: [
                   {
                       label: "처리현황",
                       backgroundColor: ["#6DA0F1", "#467FD3","#467FD3","#B2C7D9"],
                       data: [],
                   }
               ]
           },
            chartOptions: {
                title:{
                    display:true,
                    text: '처리현황',
                    position: "bottom"
                },
                    responsive: true,
                    legend: {
                        position: 'right',
                        },
                    maintainAspectRatio: true,
                pieceLabel: {
                        mode: 'percentage',
                        precision: '0'
                    }
            },
            }
    },
    methods:{
        getCCTVsToJson(){
            this.$http.get('http://localhost:3000/cctvs')
            .then((res) => {
                //console.log('getCCTVs:', res.data)
                this.getCCTVs = res.data
            })
        },
        getControllerToJson(){
            this.$http.get('http://localhost:3000/staData')
            .then((res) => {
                //console.log('getCotrollers:', res.data)
                this.getControllers = res.data

            })
        },
        isExistCCTV(cctvId){
            var returnFlag = false;
            for(var i in this.cctvsIdArr){
                if(this.cctvsIdArr[i] == cctvId){
                    returnFlag = true;
                }
            }
            //console.log(returnFlag);
            return returnFlag;
        },
        isExistController(controllerId){
            var returnFlag = false;
            for(var i in this.controllersIdArr){
                if(this.controllersIdArr[i] == controllerId){
                    returnFlag = true;
                }
            }
            //console.log(returnFlag);
            return returnFlag;
        },
        addCCTV(cctvId){
            if(!this.isExistCCTV(cctvId)){
                this.cctvsIdArr.push(cctvId);
                for(var i=0; i<this.getCCTVs.length; i++){
                    if(cctvId==this.getCCTVs[i].id){
                        this.cctvsNameArr.push(this.getCCTVs[i].cctv+cctvId);
                    }
                }
            }else{
                alert("이미 선택한 CCTV그룹입니다.");
            }
        },
        addController(controllerId){
            if(!this.isExistController(controllerId)){
                this.controllersIdArr.push(controllerId);
                for(var i=0; i<this.getControllers.length; i++){
                    if(controllerId==this.getControllers[i].id){
                        this.controllersNameArr.push(this.getControllers[i].firstName+this.getControllers[i].lastName+controllerId);
                    }
                }
            }else{
                alert("이미 선택한 관제사입니다.");
            }
        },
        removeCCTV(index){
            this.cctvsIdArr.splice(index,1);
            this.cctvsNameArr.splice(index,1);
            this.searchProcessCCTVArr.splice(index,1);
        },
        removeController(index){
            this.controllersIdArr.splice(index,1);
            this.controllersNameArr.splice(index,1);
        },
        searchProcess(){
            this.saveCid.splice(0)
            this.printProcess.splice(0)

            console.log(typeof this.firstDate)
            console.log(typeof this.firstTime)
            if( (this.cctvsIdArr.length) != 0 ){
                for(var i=0; i<this.cctvsIdArr.length; i++){
                    for(var j=0; j<this.getControllers.length; j++){
                        if(this.cctvsIdArr[i] == this.getControllers[j].cctvId){
                            if(this.saveCid.length==0){
                                this.saveCid.push(this.getControllers[j].id)
                            }else if(this.saveCid.length!=0){
                                if(this.isExistCId(this.cctvsIdArr[i])){
                                    this.saveCid.push(this.getControllers[j].id)
                                }
                            }
                        }
                    }
                }
            }
            if( this.controllersIdArr.length != 0 ){
                for(var i=0; i<this.controllersIdArr.length; i++){
                    for(var j=0; j<this.getControllers.length; j++){
                        if(this.controllersIdArr[i] == this.getControllers[j].id){
                            if(this.saveCid.length==0){
                                this.saveCid.push(this.getControllers[j].id)
                            }else if(this.saveCid.length!=0){
                                if(this.isExistCId(this.controllersIdArr[i])){
                                    this.saveCid.push(this.getControllers[j].id)
                                }
                            }
                        }
                    }
                }
            }

            for(var i=0; i<this.saveCid.length; i++){
                for(var j=0; j<this.getControllers.length; j++){
                    if(this.saveCid[i] == this.getControllers[j].id){
                        this.printProcess.push({
                            cId:this.getControllers[j].id,
                            cctvId:this.getControllers[j].cctvId,
                            cctvName:this.getControllers[j].cctvName,
                            controller:this.getControllers[j].firstName+this.getControllers[j].lastName,
                            eventType:this.getControllers[j].eventType,
                            processSitu:this.getControllers[j].processSitu
                            })
                    }
                }
            }
            this.chartDataPush()

        },
        getCCTTName(controllerId){
            for(var i=0; i<this.getCCTVs.length; i++){
                if(controllerId == this.getCCTVs[i].id){
                    return this.getCCTVs[i].cctv;
                }
            }
        },
        isExistCId(cid){
            var returnFlag = true
            for(var i=0; i<this.saveCid.length; i++){
                if(cid == this.saveCid[i]){
                    returnFlag = false
                }
            }
            return returnFlag
        },
                // 엑셀 내보내기
        makeExcelFile(){
            console.log("엑셀내보내기");
            const workBook = Xlsx.utils.book_new();
            const workSheet = Xlsx.utils.json_to_sheet(this.printProcess);
            Xlsx.utils.book_append_sheet(workBook, workSheet, '시트이름');
            Xlsx.writeFile(workBook, '파일이름.xlsx')
        },
        chartDataPush(){
            console.log(this.chartData);//////
            this.showChart = true;
            console.log(this.printProcess);
            let num1 = 0;
            let num2 = 0;
            let num3 = 0;
            let num4 = 0;
            for(let i=0; i<this.printProcess.length; i++){
                console.log(this.printProcess[i].processSitu);
                if(this.printProcess[i].processSitu === "이상없음"){
                    num1++;
                }else if(this.printProcess[i].processSitu === "미처리"){
                    num2++;
                }else if(this.printProcess[i].processSitu === "화재"){
                    num3++;
                }else {
                    num4++;
                }
            }
            // var num2 = this.chartArr[0]
             //배열 초기화
            this.chartData.datasets[0].data = [];
            this.chartData.datasets[0].data.push(num1)
            this.chartData.datasets[0].data.push(num2)
            this.chartData.datasets[0].data.push(num3)
            this.chartData.datasets[0].data.push(num4)
        }
    },
    mounted(){
        this.getCCTVsToJson();
        this.getControllerToJson();

    },
    updated(){

    },
    computed:{

    },
    watch:{

    }
}

</script>

<style scoped>

</style>
