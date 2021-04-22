<template>
    <div id="app">
        <side-bar></side-bar>
        <div id="content">
        <div class="title-wrapper">
          <span class="title">리포트 설정</span>
          <span class="addContainer" v-on:click="addReportBtn">
              <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
          </span>
          <span class="addContainer" v-on:click="modifyReportBtn">
              <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </span>
          <span class="addContainer" v-on:click="deleteReportBtn">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
          </span>
      </div>


        <!-- 리포트 설정 팝업 -->
        <Modal v-if="reportSetModal" v-on:close="reportSetModal = false">
            <div class="modal-header" slot="header">
              <span class="modal-header-title">리포트 추가</span>
                <i class="closeModalBtn fas fa-times" v-on:click="reportSetModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div class="modal-body-title">리포트 정보</div>
                 <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이름</td>
                        <td><input type="text" placeholder="사용자 ID"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>주기</td>
                      <td> <select class="modal-select1"  name="selectingPeriod" v-model="selectPeriod">
                        <option value="daily">일간</option>
                        <option value="weekly">월간</option>
                        <option value="yearly">연간</option>
                    </select>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div  slot="body">
              <div class="modal-body-title">이벤트 타입</div>
               <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이벤트 추가</td>
                        <td>
                          <select class="modal-select1" name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                        </td>
                    </tr>
                    <tr class="modal-table-body">
                      <!-- 추가 버튼???????????? -->
                      <button class="modal-groupaddBtn">추가</button>
                    </tr>
                </tbody>
              </table>
            </div>

            <span slot="footer" v-on:click="reportSetModal = false">
                <button class="button-cancle" v-on:click="userInfoSetModal = false">취소</button>
                <button class="button-add" v-on:click="addReport" >추가</button>
            </span>
        </Modal>
        <table class="table1">
           <colgroup>
                <col width="4%">
                <col width="1%">
                <col width="26%">
                <col width="26%">
                <col width="26%">
                <col width="17%">
            </colgroup>
            <thead>
                <tr class="table1-head-title">
                    <th></th>
                    <th><input type="checkbox" disabled/></th>
                    <th>이름</th>
                    <th>주기</th>
                    <th>이벤트 타입</th>
                    <th></th>
                </tr>
                <!-- <tr v-for="val in values" :key="val">
                    <td><input type="checkbox" /></td>
                    <td>{{val.name}}</td>
                    <td>{{val.period}}</td>
                    <td>{{val.eType}}</td>
                    <td>{{val.download}}</td>
                </tr> -->
                <tr class="table1-body">
                    <td></td>
                    <td><input type="checkbox" /></td>
                    <td>화재 보고</td>
                    <td>월간</td>
                    <td>화재</td>
                    <td></td>
                </tr>
                <tr class="table1-body">
                    <td></td>
                    <td><input type="checkbox" /></td>
                    <td>화재 보고</td>
                    <td>연간</td>
                    <td>움직임</td>
                    <td></td>
                </tr>
            </thead>
        </table>
        </div>
    </div>
</template>

<script>
import Modal from '../../../common/Modal'
import SideBar from '../../common/SideBar.vue'

export default {
    components:{
        Modal: Modal,
        SideBar
    },
    data(){
        return{
            // report data
            //  values:[
            //      {name:"화재 보고", period:"월간", eType:"화재", download:"□"},
            //      {name:"화재 보고", period:"주간", eType:"화재", download:"□"}
            //  ],
            // addReport data
            reportSetModal:false,
            selectPeriod:'daily',
            selectEvent:'움직임',
            events:[
                {eventName:"움직임"},
                {eventName:"배회"},
                {eventName:"침입"},
                {eventName:"쓰러짐"},
                {eventName:"화재"},
                {eventName:"연기"},
                {eventName:"싸움"},
                {eventName:"주차"},
                {eventName:"정차"},
                {eventName:"수위감시"}
            ]
        }
    },
    methods:{
        addReportBtn(){
            this.reportSetModal = !this.reportSetModal;
        },
        addReport(){
            console.log(this.selectPeriod);
            console.log(this.selectEvent);
        },
        modifyReportBtn(){
            alert("리포트 수정");
        },
        deleteReportBtn(){
            alert("리포트 삭제");
        }
    },

    head(){
        return{
            title:'시스템 정보'
        }
    }
}
</script>

<style scoped>
.modal-header-title {
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 53px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 15px;
}
.modal-header {
  background-color: #0b6ad5;
  height: 60px;
  vertical-align: center;
}
.modal-body-title {
  font-size: 18px;
  letter-spacing: -1px;
  color: #2a3144;
  font-weight: 500;
  line-height:53px;
}
.modal-table {
  width: 100%;
  font-size: 15px;
  letter-spacing: -1px;
  line-height: 60px;
  color: #424246;
}

.modal-table-body td input,
.modal-table-body td select {
  color: #434448;
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(110,110,110,0.4);
}
.modal-table-body td input {
    width: 440px;
}
.modal-select1 {
    width : 440px;
}
.modal-select2 {
    width : 370px;
}
.modal-groupaddBtn {
  background-color: #818990;
  border: 1px solid #818990;
  border-radius: 1px;
  width: 54px;
  height: 33px;
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
}
</style>
