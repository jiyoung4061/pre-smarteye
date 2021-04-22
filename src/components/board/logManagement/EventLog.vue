<template lang="">
<div>
     <side-bar></side-bar>
     <div id='content'>
    <div class="pageTitle"> 
        이벤트 로그
    </div>
    <br/>
    <div>
        검색기간
        <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~ 
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
            
        <!-- {{firstDate + " " + firstTime}}
        {{lastDate + " " + lastTime}} -->
    </div>
    <div>
        처리 상태
        <select name="selectingProceStatus" v-model="selProceStat">
            <option v-for="(value, index) in processingStat" :key="index">
               {{value}}
            </option>
        </select>
    </div>
    <br/>

    <div>
        CCTV
        <select name="selectingCCTV" v-model="selCCTVId">
            <option v-for="(cctvs, index) in getCCTVs" :key="index" v-bind:value="cctvs.id">
                {{cctvs.name}}
            </option>
        </select>
        <button v-on:click="addCCTV(selCCTVId)">추가</button>
        {{cctvsIdArr}}
        {{cctvsNameArr}}
    </div>
    
    <span v-for="(cctv,index) in cctvsNameArr" :key="cctv">
        {{cctv}}
        <span class="cctvRemove" type="button" v-on:click="removeCCTV(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>   

    <br/>
    <div>
        이벤트 타입
        <select name="selectingEvent" v-model="selEvent">
            <option v-for="(event,index) in eventType" :key="index">
                {{event}}
            </option>
        </select>
        <button v-on:click="addEvent(selEvent)">추가</button>
        {{eventPrintArr}}
        {{eventArr}}
        <div class="searchBtn">
            <button v-on:click="searchEvent(firstDate,firstTime,lastDate,lastTime,selProceStat)">
                조회
            </button>
            <button v-on:click="makeExcelFile()">
                내보내기
            </button>
        </div>
    </div>
    <span v-for="(event,index) in eventPrintArr" :key="index">
        {{event}}
        <span class="eventRemove" type="button" v-on:click="removeEvent(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>

    <br/>
    <div>
        <table class="tableAll">
            <thead>
                <tr class="tTitle">
                    <th>시간</th>
                    <th>CCTV이름</th>
                    <th>이벤트 타입</th>
                    <th>시(도) 구(군) 동(읍)</th>
                    <th>이벤트 설명</th>
                    <th>처리자</th>
                    <th>처리상태</th>
                    <!-- <th>처리설명</th> -->
                    <!-- <th>오브젝트</th> -->
                </tr>
            </thead>
                                            
            <tbody>
                <tr class="tBody" v-for="(value, index) in searchData" :key="index">
                    <td>{{value.time}}</td>
                    <td>{{value.cctvName}}</td>
                    <td>{{value.eventName}}</td>
                    <td>{{value.region}}</td>
                    <td>{{value.eventExplain}}</td>
                    <td>{{value.userName}}</td>
                    <td>{{value.proceStat}}</td>
                    <!-- <td></td>
                    <td></td> -->
                </tr>
            </tbody>
        </table>
    </div>
    </div>

</div>
</template>

<script>
import Xlsx from 'xlsx'
import SideBar from '../../common/SideBar.vue'


export default {
    components:{
        SideBar
    },
    data(){
        return{
            //json-server에서 가져온 데이터 
            getCCTVs:[],
            getEventLogs:[],

            processingStat:["이상없음","미처리","오탐"],
            eventType:["배회","움직임","침입","화제","범람"],
            cctvsIdArr:[],
            cctvsNameArr:[],
            eventPrintArr:[],
            eventArr:[],
            selCCTVId:'',
            selProceStat:'',
            selEvent:'',
            firstDate:'',
            firstTime:'',
            lastDate:'',
            lastTime:'',  

            // 조건 검색 후 조회된 데이터
            searchData:[]
        }
    },
    methods:{
        getCCTVsToJson(){
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                console.log('getCCTVs:', res.data)
                this.getCCTVs = res.data
            })            
        },
        getEventLogsToJson(){
            this.$http.get('http://localhost:3000/event_logs')
            .then((res) => {
                console.log('getEventLogs:', res.data)
                this.getEventLogs = res.data
            })            
        },
        addCCTV(cctvId){
            if(!this.isExistCCTV(cctvId)){
                this.cctvsIdArr.push(cctvId)
                for(var i=0; i<this.getCCTVs.length; i++){
                    if(cctvId==this.getCCTVs[i].id){
                        this.cctvsNameArr.push(this.getCCTVs[i].name);
                    }
                }
            }else{
                alert("이미 선택한 CCTV그룹입니다.");
            }
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
        removeCCTV(index){
            this.cctvsIdArr.splice(index,1);
            this.cctvsNameArr.splice(index,1);
        },
        addEvent(event){
            if(!this.isExistEvent(event)){
                this.eventPrintArr.push(event)
                if(event=="배회"){
                    this.eventArr.push("loitering")
                }else if(event=="화제"){
                    this.eventArr.push("fire")
                }else if(event=="움직임"){
                    this.eventArr.push("Moving")
                }else if(event=="침입"){
                    this.eventArr.push("intrusion")
                }else if(event=="범람"){
                    this.eventArr.push("flood")
                }
            }else{
                alert("이미 선택한 이벤트 타입입니다.")
            }
        },
        isExistEvent(event){
            var returnFlag = false;
            for(var i in this.eventArr){
                if(this.eventPrintArr[i] == event){
                    returnFlag = true;
                }
            }
            return returnFlag;
        },
        removeEvent(index){
            this.eventPrintArr.splice(index,1);
            this.eventArr.splice(index,1);
        },
        searchEvent(firstDate,firstTime,lastDate,lastTime,selProceStat){
            this.searchData.splice(0)
            const moment = require('moment');
            var fDateTime = firstDate+" "+firstTime
            var lDateTime = lastDate+" "+lastTime
            var searchObj = [] 

            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{
                for(let i=0; i<this.getEventLogs.length; i++){
                    if(this.isbetweenDate(fDateTime,lDateTime,this.getEventLogs[i].created_at)){
                        for(var j=0; j<this.eventArr.length; j++){
                            if(this.getEventLogs[i].event_name==this.eventArr[j] && this.getEventLogs[i].processingStatus==selProceStat){
                                for(var k=0; k<this.cctvsIdArr.length; k++){
                                    if(this.getEventLogs[i].cctv_id==this.cctvsIdArr[k]){
                                        this.searchData.push({
                                            time:this.getEventLogs[i].created_at,
                                            cctvName:this.getEventLogs[i].cctv_name,
                                            eventName:this.getEventLogs[i].event_name,
                                            eventExplain:"",
                                            region:this.getEventLogs[i].area1 + " " + this.getEventLogs[i].area2 + " " + this.getEventLogs[i].area3,
                                            userName:this.getEventLogs[i].user_name,
                                            proceStat:this.getEventLogs[i].processingStatus
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(var i=0; i<this.searchData.length; i++){
                if(this.searchData[i].eventName=="loitering"){
                    this.searchData[i].eventName="배회"
                    this.searchData[i].eventExplain=this.searchData[i].eventName + " 이벤트 발생"
                }else if(this.searchData[i].eventName=="fire"){
                    this.searchData[i].eventName="화제"
                    this.searchData[i].eventExplain=this.searchData[i].eventName + " 이벤트 발생"
                }else if(this.searchData[i].eventName=="Moving"){
                    this.searchData[i].eventName="움직임"
                    this.searchData[i].eventExplain=this.searchData[i].eventName + " 이벤트 발생"
                }else if(this.searchData[i].eventName=="intrusion"){
                    this.searchData[i].eventName="침입"
                    this.searchData[i].eventExplain=this.searchData[i].eventName + " 이벤트 발생"
                }else if(this.searchData[i].eventName=="flood"){
                    this.searchData[i].eventName="범람"
                    this.searchData[i].eventExplain=this.searchData[i].eventName + " 이벤트 발생"
                }
            }
        },
        isbetweenDate(fDateTime,lDateTime,searchDate){
            let returnFlag=false
            const moment = require('moment');
            if(moment(searchDate).isBetween(fDateTime, lDateTime, undefined, '()')){
                returnFlag = true
            }
            console.log(returnFlag)
            return returnFlag
        },
        // 엑셀 내보내기
        makeExcelFile(){
            console.log("엑셀내보내기");
            const workBook = Xlsx.utils.book_new();
            const workSheet = Xlsx.utils.json_to_sheet(this.searchData);
            Xlsx.utils.book_append_sheet(workBook, workSheet, '시트이름');
            Xlsx.writeFile(workBook, '이벤트 로그.xlsx')
        },
    },
    mounted() {
        this.getCCTVsToJson()
        this.getEventLogsToJson()
    }
}
</script>

<style lang="">
#content {
    padding-left: 270px;
}

table {
    width:100%;
    border-collapse: collapse;
    border: 1px solid black;
    text-align:center;
    table-layout: fixed;
}
tr{
    vertical-align : top;
}
.searchBtn{
    float: right;
}
.tTitle {
    border: 1px solid black;
    border-bottom: 1px solid ;
    font-size:12px;
}
.tableAll{
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
}
</style>