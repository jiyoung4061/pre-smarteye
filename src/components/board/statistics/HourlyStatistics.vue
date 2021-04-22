<template>
<div>
    <side-bar></side-bar>
    <div id="content">
    <div class="title-wrapper">
    <span class="title">객체종류 시간별 통계</span>
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
           <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
            {{firstDate + " " + firstTime}}
            {{lastDate + " " + lastTime}}
          </td>
        </tr>
        <tr class="condition-table-body">
          <td>검색주기</td>
          <td>
            <select name="selectingCycle" v-model="selectCycle">
              <option value="hourly">시간별</option>
              <option value="daily">일별</option>
              <option value="monthly">월별</option>
            </select>
            {{selectCycle}}
          </td>
        </tr>
        <tr class="condition-table-body">
          <td>객체종류</td>
          <td>
             <select name="selectingObject" v-model="selectObject" >
            <option v-for="(object, index) in objectCategory" :key="index">
                {{object}}
            </option>
        </select>
            <button class="button-add" v-on:click="addObject(selectObject)">추가</button>
          </td>
        </tr>
        <tr class="condition-table-body">
          <td></td>
          <td>
            <!-- {{objectArr}} -->
            <span class="groupbutton">차
              <span class="groupremove" type="button">
                <i class="closeBtn fas fa-times"></i>
              </span>
            </span>
            <span class="groupbutton">사람
              <span class="groupremove" type="button">
                <i class="closeBtn fas fa-times"></i>
                </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <div class="searchBtn">
      <button class="button-add">내보내기</button>
      <button class="button-cancle" v-on:click="searchObjectHourly(firstDate,firstTime,lastDate,lastTime,selectCycle)">조회</button>
    </div>
  </div>
    <span v-for="(object,index) in objectArr" :key="index+1">
        {{object}}
        <span class="objectRemove" type="button" v-on:click="removeObject(index+1)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>

  <div class="content-result">
    <table class="table1">
      <thead>
        <tr class="table1-head-title">
          <th>기간</th>
          <th>차</th>
          <th>사람</th>
          <th>합계</th>
        </tr>
      </thead>
        <tbody>
          <tr class="table1-body" >
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
    </table>
  </div>
</div>
    </div>
</template>

<script>
import SideBar from '../../common/SideBar.vue'


export default {
    components:{
        SideBar
    },
    data(){
        return{
            getObjectTimeData:[],

            firstDate:'',
            firstTime:'',
            lastDate:'',
            lastTime:'',

            //검색 주기 선택시 필요
            selectCycle:'',

            // 객체 종류 추가시 필요
            objectCategory:["차","사람"],
            selectObject:'',
            objectArr:[],

            // 최종 통계 데이터
            searchData:[]
        }
    },
    methods:{
        getObjectTimeToJson(){
            this.$http.get('http://localhost:3000/result_of_object')
            .then((res) => {
                console.log('getdata: ', res.data)
                this.getObjectTimeData = res.data
            })
        },
        addObject(selectObject){
            if(!this.isExistObject(selectObject)){
                this.objectArr.push(selectObject)
            }else{
                alert("이미 선택한 객체 입니다.")
            }
        },
        removeObject(index){
            this.objectArr.splice(index-1,1);
        },
        isExistObject(selectObject){
            let returnFlag = false;
            for(let i in this.objectArr){
                if(this.objectArr[i] == selectObject){
                    returnFlag = true;
                }
            }
            // console.log(returnFlag);
            return returnFlag;
        },
        searchObjectHourly(firstDate,firstTime,lastDate,lastTime,selectCycle){
            this.searchData.splice(0)
            let fDateTime = firstDate+" "+firstTime
            let lDateTime = lastDate+" "+lastTime

            // var date=fDateTime.split(" ")[0];
            // console.log("date "+date)

            // if(selectCycle=="monthly"){
            //     fDateTime = fDateTime.substr(0,7)
            //     lDateTime = lDateTime.substr(0,7)
            // }else if(selectCycle=="daily"){
            //     fDateTime = fDateTime.substr(0,10)
            //     lDateTime = lDateTime.substr(0,10)
            // }else if(selectCycle=="hourly"){
            //     fDateTime = fDateTime.substr(0,13)
            //     lDateTime = lDateTime.substr(0,13)
            // }
            // let fDateTime = firstDate+" "+firstTime
            // let lDateTime = lastDate+" "+lastTime

            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{

            }
        },







        isbetweenDate(fDateTime,lDateTime,searchDate){
            let returnFlag=false
            const moment = require('moment');
            if(moment(searchDate).isBetween(fDateTime, lDateTime, undefined, '()')){
                returnFlag = true
            }
            // console.log(returnFlag)
            return returnFlag
        }
    },
    mounted() {
        this.getObjectTimeToJson()
    }
}
</script>
<style lang="">
.table1 {
  width: 100%;
}
.searchBtn{
    float: right;
}
</style>
