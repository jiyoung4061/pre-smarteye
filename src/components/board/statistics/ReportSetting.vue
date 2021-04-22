<template>
    <div id="app">
        <side-bar></side-bar>
        <div id='content'>
        <div class="pageTitle">
            리포트 설정
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
            <div slot="header">리포트 추가
                <i class="closeModalBtn fas fa-times" v-on:click="reportSetModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div>리포트 정보</div><br/>
                <div>이름<input type="text" placeholder="사용자 ID"/></div>
                <div>주기
                    <select name="selectingPeriod" v-model="selectPeriod">
                        <option value="daily">일간</option>
                        <option value="weekly">월간</option>
                        <option value="yearly">연간</option>
                    </select>
                </div>
                <br>
            </div>
            <div  slot="body">
                <div>이벤트 타입</div><br/>
                <div>이벤트 추가
                    <select name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                    <button>추가</button>
                </div>
                <br/>
            </div>

            <span slot="footer" v-on:click="reportSetModal = false">
                <button v-on:click="addReport" >추가</button>
                <button v-on:click="userInfoSetModal = false">취소</button>
            </span>
        </Modal>

        
        <table>
            <colgroup>
                <col width="1%">
                <col width="29%">
                <col width="29%">
                <col width="29%">
                <col width="12%">
            </colgroup>
            <thead>
                <tr class="title">
                    <th><input type="checkbox" /></th>
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
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>화재 보고</td>
                    <td>월간</td>
                    <td>화재</td>
                    <td><button>다운로드</button></td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>화재 보고</td>
                    <td>연간</td>
                    <td>움직임</td>
                    <td><button>다운로드</button></td>
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
#content {
    padding-left: 270px;
}
table {
    border-collapse: collapse;
    border: 1px solid black;
    text-align:center;
    table-layout: fixed;
}
.title {
    border-bottom: 1px solid ;
}
.pageTitle{
    font-size:2em;
}
.addContainer{
    font-size:0.8em;
}
.modalBody{
    font-size:2em;
}
</style>