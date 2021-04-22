<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <table>
            <thead>
                <strong> RTSP 정보 </strong>
                <button @click="ShowInsertModal()"> 추가 </button>
                <button @click="ShowUpdateModal()"> 수정 </button>
                <button @click="delRTSPInfo(checkedRTSP)"> 삭제 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> ID </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델명 </strong></td>
                        <td><strong> Paths </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(RTSPInfo, i) in RTSPInfos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="RTSPInfo.id" v-model="checkedRTSP"></td>
                    <td><span> {{ RTSPInfo.id }}  </span></td>
                    <td><span> {{ RTSPInfo.manufacturer }} </span></td>
                    <td><span> {{ RTSPInfo.model }} </span></td>
                    <td><span> {{ RTSPInfo.paths }} </span></td>
                </tr>
            </tfoot>
        </table>
        <RTSPInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRTSPInfo()">
        </RTSPInsert>

        <RTSPUpdate :rtspId.sync="rtspId" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getRTSPInfo()">
        </RTSPUpdate>
    </body>
    </div>
</div>
</template>

<script>
import RTSPInsert from './Modals/RTSP/RTSPInsertModal.vue';
import RTSPUpdate from './Modals/RTSP/RTSPUpdateModal.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        RTSPInsert: RTSPInsert,
        RTSPUpdate: RTSPUpdate,
        SideBar
    },
    mounted() {
        this.getRTSPInfo()
    },
    data() {
        return {
            InsertModal: false,
            UpdateModal: false,
            selectAll: false,
            RTSPInfos:[],
            checkedRTSP:[],
            rtspId: '',
        }
    },
    methods: {
        checkAll() {
            this.checkedRTSP = [];
            if(!this.selectAll) {
                for(let i in this.RTSPInfos) {
                    this.checkedRTSP.push(this.RTSPInfos[i].id)
                }
            }
        },
        getRTSPInfo () {
            this.$http.get('http://localhost:3000/rtsp_infos')
            .then((res) => {
                this.RTSPInfos = res.data
            })
        },
        delRTSPInfo (checkedRTSP) {
            if(this.checkedRTSP.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedRTSP.length; i++)
                {
                    this.$http.delete('http://localhost:3000/rtsp_infos/'+checkedRTSP[i])
                .then((res) => {
                    this.getRTSPInfo()
                 })
                }
            }
            
            this.checkedRTSP = [];
        },
        ShowInsertModal() {           
                this.InsertModal = !this.InsertModal;
        },
        ShowUpdateModal() {
            if(0 == this.checkedRTSP.length)  {
                alert('RTSP를 선택해주세요.')
            }
            else if (this.checkedRTSP.length > 1) {
                alert('RTSP를 하나만 선택해주세요.')
            }
            else {
                this.rtspId = this.checkedRTSP[0];
                this.UpdateModal = !this.UpdateModal;
            }
        }
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