<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <span>
            <thead>
                <strong> 그룹 목록 </strong>
                <button @click="makeGroup()"> 추가 </button>
                <button @click="ShowGroupUpdateModal()"> 수정 </button>
                <button @click="delGroup(checkedGroup)"> 삭제 </button>
            </thead>
            <tbody>
                <tr>
                    <td><strong> 그룹명 </strong></td>
                </tr>
                <tr v-for="(Group_Info, i) in Group_Infos" :key="i" :value="Group_Info.id" class="list-unstyled">
                    <td><span> {{ Group_Info.name }}</span></td>
                </tr>
            </tbody>
        </span>
        <span>
            <thead>
                <strong> 카메라 목록 </strong>
                <button @click="loadCCTV()"> 조회 </button>
                <button @click="insertGroupID()"> 추가 </button>
                <button @click="test()"> 삭제 </button>
            </thead>
            <tbody>
                <td><strong> 번호 </strong></td>
                <td><strong> 사용 </strong></td>
                <td><strong> 장치 이름 </strong></td>
                <td><strong> 모델명 </strong></td>
                <td><strong> 주소 </strong></td>
                <td><strong> 웹 포트 </strong></td>
                <td><strong> 서비스 포트 </strong></td>
                <td><strong> 제조사 </strong></td>
                <td><strong> 장치 종류 </strong></td>
            </tbody>
            <tfoot>
                <tr v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" class="list-unstyled">
                    <td><span> {{ i+1 }}  </span></td>
                    <td>
                        <span v-if="CCTV_Info.ptz_control_usage == 1"> 정상 </span>
                        <span v-else-if="CCTV_Info.ptz_control_usage == 0"> 고장 </span>
                    </td>
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    <td><span> {{ CCTV_Info.model }} </span></td>
                    <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }}</span></td>
                    <td><span> {{ CCTV_Info.manage_port }} </span></td>
                    <td><span> {{ CCTV_Info.rtsp_port }} </span></td>
                    <td><span> {{ CCTV_Info.manufacturer }} </span></td>
                    <td><span> {{ CCTV_Info.camera_type }} </span></td>
                </tr>
            </tfoot>
        </span>

        <!-- <GroupUpdate :group_id.sync="group_id" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getGroup()">
        </GroupUpdate>
        <InsertGroupId :group_id.sync="group_id" v-if="insertGroupIDModal" @close="insertGroupIDModal = false" v-on:close="getGroup()">
        </InsertGroupId> -->
    </body>
    </div>
</div>
</template>

<script>
import GroupUpdate from './Modals/CCTVGroup/UpdateModal.vue';
import InsertGroupId from './Modals/CCTVGroup/InsertGroupId.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },
    mounted() {
        this.getData();
    },
    data() {
        return {
            Group_Infos:[],
            CCTV_Infos:[],
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/cctvgroup_infos')
            .then((res) => {
                this.Group_Infos = res.data
            })

            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTV_Infos = res.data
            })
        },
        makeGroup() {
            this.$http.post('http://localhost:3000/group_data', {
                name: '새 그룹'
            })
            .then((res) => {
                this.groups.push(res.data);
            })

            this.getGroup();
        },
        ShowGroupUpdateModal() {
            if(0 == this.checkedGroup.length)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.checkedGroup.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                this.group_id = this.checkedGroup[0];
                this.UpdateModal = !this.UpdateModal;
            }
        },
        delGroup (checkedGroup) {
            if(this.checkedGroup.length == 0)
            {
                alert('그룹을 선택하세요')
            }
            else {
                for(let i = 0; i < checkedGroup.length; i++){
                    this.$http.delete('http://localhost:3000/group_data/'+checkedGroup[i])
                    .then((res) => {
                        this.getGroup()
                    })
                }
            }
            this.checkedGroup = [];
        },
        loadCCTV() {
            if(this.camerasingroup.length > 0) {
                this.camerasingroup = [];
            }

            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.cameras = res.data
            })

            for(let i = 0; i < this.cameras.length; i++) {
                for(let j = 0; j < this.checkedGroup.length; j++) {
                    if(this.cameras[i].group_id == this.checkedGroup[j]) {
                        this.camerasingroup.push(this.cameras[i])
                    }
                }
            }

            this.cameras = [];
        },
        insertGroupID() {
            if(0 == this.checkedGroup.length)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.checkedGroup.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                this.group_id = this.checkedGroup[0];
                this.insertGroupIDModal = !this.insertGroupIDModal;
            }
        },
        // ShowInsertModal() {
            
        //         this.InsertModal = !this.InsertModal;
        // },
        // ShowUpdateModal() {
        //     if(0 == this.checkedReco.length)  {
        //         alert('녹화장치를 선택해주세요.')
        //     }
        //     else if (this.checkedReco.length > 1) {
        //         alert('녹화장치를 하나만 선택해주세요.')
        //     }
        //     else {
        //         this.recoId = this.checkedReco[0];
        //         this.UpdateModal = !this.UpdateModal;
        //     }
        // }
    },
    components: {
        // RecoInsert: RecoInsert,
        // RecoUpdate: RecoUpdate,
        GroupUpdate: GroupUpdate,
        InsertGroupId: InsertGroupId,
        SideBar,
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