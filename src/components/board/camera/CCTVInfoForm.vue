<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <table>
            <thead>
                <strong> 카메라 목록 </strong>
                <button @click="ShowInsertModal()"> 추가 </button>
                <button @click="ShowUpdateModal()"> 수정 </button>
                <button @click="delCCTVInfo(checkedCCTV)"> 삭제 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll" ></td>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 상태 </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소 </strong></td>
                        <td><strong> 웹 포트 </strong></td>
                        <td><strong> 서비스 포트 </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델 </strong></td>
                        <td><strong> 설명 </strong></td>
                        <td><strong> 비밀번호 </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(CCTVInfo, i) in CCTVInfos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="CCTVInfo.id" v-model="checkedCCTV"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td>
                        <span v-if="CCTVInfo.ptz_control_usage == 1"> 정상 </span>
                        <span v-else-if="CCTVInfo.ptz_control_usage == 0"> 고장 </span>
                    </td>
                    <td><span> {{ CCTVInfo.name }} </span></td>
                    <td><span> {{ CCTVInfo.area1 }} {{ CCTVInfo.area2 }} {{ CCTVInfo.area3 }}</span></td>
                    <td><span> {{ CCTVInfo.manage_port }} </span></td>
                    <td><span> {{ CCTVInfo.rtsp_port }} </span></td>
                    <td><span> {{ CCTVInfo.manufacturer }} </span></td>
                    <td><span> {{ CCTVInfo.model }} </span></td>
                    <td><span> {{ CCTVInfo.comment }} </span></td>
                    <td><span> {{ CCTVInfo.password }} </span></td>
                </tr>
            </tfoot>
        </table>

        <CCTVInsert v-if="showInsert" @close="showInsert = false, getCCTVInfo()"></CCTVInsert>
        <CCTVUpdate :CCTVId.sync="CCTVId" v-if="showUpdate" @close="showUpdate = false, getCCTVInfo()"></CCTVUpdate>
    </body>
    </div>
</div>
</template>

<script>
import CCTVInsert from './Modals/CCTVInfo/CCTVInsertModal.vue';
import CCTVUpdate from './Modals/CCTVInfo/CCTVUpdateModal.vue';


import SideBar from '../../common/SideBar.vue';

export default {
        components: {
        CCTVInsert: CCTVInsert,
        CCTVUpdate: CCTVUpdate,
        SideBar,
    },
    mounted() {
        this.getCCTVInfo()
    },
    data() {
        return {
            CCTVInfos: [],
            checkedCCTV: [],
            showInsert: false,
            showUpdate: false,
            selectAll : false,
            CCTVId: ''
        }
    },
    methods: {
        getCCTVInfo () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTVInfos = res.data
            })
        },
        delCCTVInfo (checkedCCTV) {
            if(this.checkedCCTV.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedCCTV.length; i++)
                {
                    this.$http.delete('http://localhost:3000/cctv_infos/'+checkedCCTV[i])
                    .then((res) => {
                    this.getCCTVInfo()
                 })
                }
            }
            
            this.checkedCCTV = [];
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.CCTVInfos) {
                    this.checkedCCTV.push(this.CCTVInfos[i].id)
                }
            }
        },
        ShowInsertModal() {           
                this.showInsert = !this.showInsert;
        },
        ShowUpdateModal() {
            if(0 == this.checkedCCTV.length)  {
                alert('녹화장치를 선택해주세요.')
            }
            else if (this.checkedCCTV.length > 1) {
                alert('녹화장치를 하나만 선택해주세요.')
            }
            else {
                this.CCTVId = this.checkedCCTV[0];
                this.showUpdate = !this.showUpdate;
            }
                
        },
    },

}
</script>


<style scoped>
#content {
    padding-left: 270px;
}

.tBody {
    border: 3px solid black;
}

td {
    border: 1px solid #bcbcbc;
}


</style>