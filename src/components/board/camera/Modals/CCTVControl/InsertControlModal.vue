<template>
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3> 집중관제 카메라 추가 </h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <tr v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" class="list-unstyled">
                    <template v-if="CCTV_Info.control_group == false && i < 30" >
                    <td><input type="checkbox" :value="CCTV_Info.id" v-model="checkList"></td>
                    <!-- <td><span> {{ CCTV_Info.id }}  </span></td> -->
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    </template>
                </tr>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
                <!-- <button @click="filterData()"> 갱신 </button> -->
                <button @click="updateControl(), $emit('close')"> 수정 </button>
                <button @click="$emit('close')"> 취소 </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  data() {
        return {
            CCTV_Infos: [],

            checkList: [],
        }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('http://localhost:3000/cctv_infos/')
      .then((res) => {
          this.CCTV_Infos = res.data
      })
    },
    filterData() {
    },
    updateControl() {
        for(let i = 0; i < this.checkList.length; i++) {
            this.$http.patch('http://localhost:3000/cctv_infos/'+this.checkList[i], {
                control_group: true
            })
            .then((res) => {
            })
        }
    }
  }
}
</script>


<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
