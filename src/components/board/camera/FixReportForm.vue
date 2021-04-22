<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <table>
            <thead>
                <strong> 고장 리포트 </strong>
                <!-- <button @click="reloadData()"> 데이터 갱신 </button> -->
                <button @click="ShowModal()"> 코멘트 설정 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><strong> ID </strong></td>
                        <td><strong> 보고자 </strong></td>
                        <td><strong> 보고일자 </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소(시/군/구) </strong></td>
                        <td><strong> 보고 사유 </strong></td>
                        <td><strong> 관리자 코멘트 </strong></td>
                        <td><strong> 수리 현황 </strong></td>
                    </tr>
                </tbody>
            <tfoot v-for="(CCTV_Info, i) in CCTV_Infos" :key="i">
                <tr v-if="CCTV_Info.ptz_control_usage == 0">
                    <td><span> {{ CCTV_Info.id }} </span></td>
                    <td><span> {{ CCTV_Info.reporter }} </span></td>
                    <td><span> {{ CCTV_Info.updated_at }} </span></td>
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }} </span></td>
                    <td><span> {{ CCTV_Info.reporter_comment }} </span></td>
                    <td><span> {{ CCTV_Info.comment }} </span></td>
                    <td><button :value="CCTV_Info.id" @click="fixCCTV(CCTV_Info.id)"> 수리완료 </button></td>
                </tr>
            </tfoot>
        </table>

        <CommentModal v-if="showModal" @close="showModal = false">
        </CommentModal>
    </body>
    </div>
</div>
</template>

<script>
import CommentModal from './Modals/FixReport/CommentModal.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components: {
        CommentModal: CommentModal,
        SideBar
    },
    created() {
        this.getData()
    },
    data() {
        return {
            CCTV_Infos: [],
            Filter_CCTVs: [],

            showModal: false
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                // console.log(res.data)
                this.CCTV_Infos = res.data
            })
        },
        filterData () {
            for(let i = 0; i < this.CCTV_Infos.length; i++) {
                if(this.CCTV_Infos[i].ptz_control_usage == 0) {
                    this.Filter_CCTVs.push({
                        id : this.CCTV_Infos[i].id,
                        updated_at : this.CCTV_Infos[i].updated_at,
                        name : this.CCTV_Infos[i].name,
                        area1 : this.CCTV_Infos[i].area1,
                        area2 : this.CCTV_Infos[i].area2,
                        area3 : this.CCTV_Infos[i].area3,
                        reporter_comment : this.CCTV_Infos[i].reporter_comment,
                        comment : this.CCTV_Infos[i].comment
                    })
                }
            }
        },
        fixCCTV(id) {
            this.$http.patch('http://localhost:3000/cctv_infos/'+ id, {
                ptz_control_usage: 1
            })
            .then((res) => {
                // this.Filter_CCTVs.push(res.data);
            })

            this.CCTV_Infos =  [],

            this.getData();
        },
        ShowModal() {
            this.showModal = !this.showModal;
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