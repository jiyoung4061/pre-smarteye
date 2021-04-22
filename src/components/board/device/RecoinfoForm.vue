<template>
    <div>
        <side-bar></side-bar>
        <div id='content'>
    <body>
        <table>
            <thead>
                <strong> 녹화장치 정보 </strong>
                <button @click="ShowInsertModal()"> 추가 </button>
                <button @click="ShowUpdateModal()"> 수정 </button>
                <button @click="delRecoInfo(checkedReco)"> 삭제 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 서버이름 </strong></td>
                        <td><strong> IP 주소 </strong></td>
                        <td><strong> 업체명 </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(RecoInfo, i) in RecoInfos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="RecoInfo.id" v-model="checkedReco"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td><span> {{ RecoInfo.name }} </span></td>
                    <td><span> {{ RecoInfo.ip_address }} </span></td>
                    <td><span> {{ RecoInfo.vendor }} </span></td>
                </tr>
            </tfoot>
        </table>
        <RecoInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRecoInfo()">
        </RecoInsert>

        <RecoUpdate :recoId.sync="recoId" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getRecoInfo()">
        </RecoUpdate>
    </body>
        </div>
    </div>
</template>

<script>
import RecoInsert from '../device/Modals/RecoInsert';
import RecoUpdate from '../device/Modals/RecoUpdate.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },
    mounted() {
        this.getRecoInfo()
    },
    data() {
        return {
            InsertModal: false,
            UpdateModal: false,
            selectAll: false,
            RecoInfos:[],
            checkedReco:[],
            recoId: '',
        }
    },
    methods: {
        checkAll() {
            this.checkedReco = [];
            if(!this.selectAll) {
                for(let i in this.RecoInfos) {
                    this.checkedReco.push(this.RecoInfos[i].id)
                }
            }
        },
        getRecoInfo () {
            this.$http.get('http://localhost:3000/recoding_infos')
            .then((res) => {
                this.RecoInfos = res.data
            })
        },
        delRecoInfo (checkedReco) {
            if(this.checkedReco.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedReco.length; i++)
                {
                    this.$http.delete('http://localhost:3000/recoding_infos/'+checkedReco[i])
                .then((res) => {
                    this.getRecoInfo()
                 })
                }
            }
            
            this.checkedReco = [];
        },
        ShowInsertModal() {
            
                this.InsertModal = !this.InsertModal;
        },
        ShowUpdateModal() {
            if(0 == this.checkedReco.length)  {
                alert('녹화장치를 선택해주세요.')
            }
            else if (this.checkedReco.length > 1) {
                alert('녹화장치를 하나만 선택해주세요.')
            }
            else {
                this.recoId = this.checkedReco[0];
                this.UpdateModal = !this.UpdateModal;
            }
        }
    },
    components: {
        RecoInsert: RecoInsert,
        RecoUpdate: RecoUpdate,
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