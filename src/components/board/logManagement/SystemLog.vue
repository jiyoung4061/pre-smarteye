<template>
    <div>
        <side-bar></side-bar>
        <div id="content">
          <div class="title-wrapper">
          시스템 로그
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
            <!-- {{firstDate + " " + firstTime}}
            {{lastDate + " " + lastTime}} -->
         </td>
          </tr>




          <tr class="condition-table-body">
            <td>검색 조건</td>
            <td>
              <input id="checkbox-input" type="checkbox" v-model="loginCheck"> 로그인
              <input id="checkbox-input" type="checkbox" v-model="logoutCheck"> 로그아웃
              <input id="checkbox-input" type="checkbox" v-model="resetSet"> 설정 초기화
            </td>
          </tr>
</tbody>
        </table>

            <button class="button-add" v-on:click="searchLog(firstDate,firstTime,lastDate,lastTime,loginCheck,logoutCheck,resetSet)">조회</button>
            <button class="button-cancle" v-on:click="makeExcelFile()">내보내기</button>



        <div class="content-result">
              <table class="table1" style="width: 100%">
                  <thead>
                      <tr class="table1-head-title">
                        <th>시간</th>
                        <th>사용자</th>
                        <th>상대IP</th>
                        <th>행동</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="table1-body" v-for="(value,index) in searchData" :key="index">
                    <td>{{value.created_at}}</td>
                    <td>{{value.user_name}}</td>
                    <td>{{value.remote_ip}}</td>
                    <td>{{value.action}}</td>
                    <td>{{value.state}}</td>
                </tr>
            </tbody>
            </table>
        </div>
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
            getAuthData:[],
            firstDate:'',
            lastDate:'',
            firstTime:'',
            lastTime:'',

            searchData:[],
            aa:[],
            loginCheck:false,
            logoutCheck:false,
            resetSet:false,
        }
    },
    methods:{
        getAuthToJson(){
            this.$http.get('http://localhost:3000/authentication_logs')
            .then((res) => {
                console.log('getdata: ', res.data)
                this.getAuthData = res.data
            })
        },
        searchLog(firstDate,firstTime,lastDate,lastTime,loginCheck,logoutCheck,resetSet){
            this.searchData.splice(0)
            const moment = require('moment');
            var fDateTime = firstDate+" "+firstTime
            var lDateTime = lastDate+" "+lastTime
            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{
                for(var i=0; i<this.getAuthData.length; i++){
                    if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') && loginCheck && logoutCheck){
                        // console.log(this.getAuthData[i].action=="Logout")
                        this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                    }else if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') &&logoutCheck){
                        if(this.getAuthData[i].action=="Logout"){
                            this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                        }
                    }else if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') &&loginCheck){
                        if(this.getAuthData[i].action=="Login"){
                            this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                        }
                    }
                }
            }
        },
        // 엑셀 내보내기
        makeExcelFile(){
            console.log("엑셀내보내기");
            const workBook = Xlsx.utils.book_new();
            const workSheet = Xlsx.utils.json_to_sheet(this.searchData);
            Xlsx.utils.book_append_sheet(workBook, workSheet, '시트이름');
            Xlsx.writeFile(workBook, '시스템 로그.xlsx')
        },
    },
    mounted(){
        this.getAuthToJson()
    }
}
</script>

<style lang="">
#checkbox-input {
  width: 15px;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
