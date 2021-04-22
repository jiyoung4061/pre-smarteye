<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <body>
        <table>
            <thead>
                <strong> 카메라 상태 확인 </strong>
                <button @click="getCount(), getTime()"> 데이터 갱신 </button>
                <span> <strong> 전체 : </strong> {{ total }}   </span>
                <span> <strong> 정상 : </strong> {{ Health_True }}   </span>
                <span> <strong> 비정상 : </strong> {{ Health_False }}   </span>
                <span> <strong>최종 업데이트 :</strong> {{ update_Date }}   </span>
            </thead>
                <tbody>
                    <tr>
                        <td><strong> ID </strong></td>
                        <td><strong> 카메라명 </strong></td>
                        <td><strong> Health Check </strong></td>
                        <td><strong> Health Comment </strong></td>
                        <td><strong> User Comment </strong></td>
                        <td><strong> Action </strong></td>
                    </tr>
                </tbody>
            <tfoot >
                <tr v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" class="list-unstyled" >
                    <td><span> {{ CCTV_Info.id }} </span></td>
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    <td><span> {{ CCTV_Info.health_check }} </span></td>
                    <td><span> {{ CCTV_Info.comment }} </span></td>
                    <td><span> {{ CCTV_Info.user_comment }} </span></td>
                    <td><button :value="CCTV_Info.id" @click="getData(), getTime()"> 새로고침 </button></td>
                </tr>
            </tfoot>
        </table>
    </body>
    </div>
</div>
</template>

<script>
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },

    mounted() {
        this.getData();
        this.getTime();
    },
    beforeUpdate() {
        this.getCount();
    },
    data() {
        return {
            CCTV_Infos:[],
            Health_Infos: [],

            total: 0,
            Health_True: 0,
            Health_False: 0,
            update_Date : ''
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTV_Infos = res.data
            })
        },
        getCount() {
            this.total =  0
            this.Health_True= 0
            this.Health_False= 0

            this.total = this.CCTV_Infos.length;

            
            for(let i = 0; i < this.CCTV_Infos.length; i++) {   
                if(this.CCTV_Infos[i].health_check == "true") {
                    this.Health_True += 1;
                }
                else if (this.CCTV_Infos[i].health_check == "false") {
                    this.Health_False += 1;
                }
            }
        },
        getTime() {
            var moment = require('moment');
            this.update_Date = moment().format('YYYY-MM-DD   h:mm:ss a');
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