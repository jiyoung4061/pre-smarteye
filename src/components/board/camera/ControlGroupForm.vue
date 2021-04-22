<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <table>
            <thead>
                <span><strong> 집중관제 그룹 </strong></span>
                <button @click="ShowInsertModal()"> 추가 </button>           
                <button @click="delCtrlCCTV(checkedCCTV)"> 삭제 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> ID </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소 </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델 </strong></td>
                    </tr>
                </tbody>
            <tfoot v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" >
                <tr v-if="CCTV_Info.control_group == true" class="list-unstyled">
                    <td><input type="checkbox" :value="CCTV_Info.id" v-model="checkedCCTV"></td>
                    <td><span> {{ CCTV_Info.id }}  </span></td>
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }}</span></td>
                    <td><span> {{ CCTV_Info.manufacturer }} </span></td>
                    <td><span> {{ CCTV_Info.model }} </span></td>
                </tr>
            </tfoot>
        </table>

        <InsertControl v-if="InsertModal" @close="InsertModal = false" v-on:close="getCCTVInfo()">
        </InsertControl>

    </body>
    </div>
</div>
</template>

<script>
import InsertControl from './Modals/CCTVControl/InsertControlModal';
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        InsertControl: InsertControl,
        SideBar
    },
    mounted() {
        this.getCCTVInfo();
    },
    data() {
        return {
            CCTV_Infos: [],
            Control_CCTVs: [],
            checkedCCTV:[],

            InsertModal: false,
            selectAll: false
        }
    },
    methods: {
        getCCTVInfo () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTV_Infos = res.data
            })
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.Control_CCTVs) {
                    this.checkedCCTV.push(this.Control_CCTVs[i].id)
                }
            }
        },
        delCtrlCCTV (checkedCCTV) {
            if(this.checkedCCTV.length == 0)
            {
                alert('CCTV를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedCCTV.length; i++)
                {
                    this.$http.patch('http://localhost:3000/cctv_infos/'+this.checkedCCTV[i], {
                        control_group: false
                    })
                    .then((res) => {
                        this.CCTV_Infos.push(res.data);
                    })
                }
            }
            this.checkedCCTV = [];

            this.getCCTVInfo();
        },
        ShowInsertModal() {
                this.InsertModal = !this.InsertModal;
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