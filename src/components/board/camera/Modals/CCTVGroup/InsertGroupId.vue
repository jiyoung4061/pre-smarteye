<template>
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3> 카메라 목록 </h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <tr v-for="(CCTVInfo, i) in CCTVInfos" :key="i" class="list-unstyled">
                    <td>
                      <input v-if="CCTVInfo.group_id == 0" type="checkbox" :value="CCTVInfo.id">
                      <input v-if="CCTVInfo.group_id != 0" type="checkbox" :value="CCTVInfo.id" checked disabled>
                    </td>
                    <td><span> {{ CCTVInfo.name }}  </span></td>
                </tr>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="$emit('close')"> 수정 </button>
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
  props : {
    group_id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    // this.loadData();
    // this.getCCTVGroupData();
    this.loadData();
    // this.getCCTVGroupData();
  },
  data() {
        return {
            groupData: [],
            CCTVInfos: [],
            cameraDatas: [],
            checkedCCTV: [],
            name: '',
        }
  },
  methods: {
    loadData() {
      this.$http.get('http://localhost:3000/cctv_infos')
      .then((res) => {
          this.CCTVInfos = res.data;
          // this.cameras = res.data;
      })

      for(let i = 0; i < this.CCTVInfos.length; i++) {
        // console.log(this.CCTVInfos[i].group_id)
        if(this.CCTVInfos[i].group_id === 0) {
          this.cameraDatas.push(this.CCTVInfos[i])
        }
      }
    },
    // updateGroupData(name) {
    //     // if(name){
    //     //     this.$http.patch('http://localhost:3000/group_data/'+this.group_id, {
    //     //     name: name
    //     //     })
    //     //     .then((res) => {
    //     //     this.groupData.push(res.data);
    //     //     })
    //     // }
    // },
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
