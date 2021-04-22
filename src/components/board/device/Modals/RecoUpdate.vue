<template>
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3> 녹화장치 수정</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <span> 서버 이름 </span><input type="text" v-model="name"><br/>
                <span> ip 주소 </span><input type="text" v-model="ip_address"><br/>
                <span> 업체명 </span><input type="text" v-model="vendor"><br/>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="updateRecoInfo(name, ip_address, vendor), $emit('close')"> 수정 </button>
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
    recoId: {
      type: Number,
      required: true
    }
  },
  data() {
        return {
            RecoInfos: [],
            name: '',
            ip_address: '',
            vendor: '',
        }
  },
  mounted() {
    this.getRecoInfo()
  },
  methods: {
    getRecoInfo () {
      this.$http.get('http://localhost:3000/recoding_infos/'+this.recoId)
      .then((res) => {
          this.name = res.data.name
          this.ip_address = res.data.ip_address
          this.vendor = res.data.vendor
      })
    },
    updateRecoInfo(name, ip_address, vendor) {
        if(name && ip_address && vendor){
            this.$http.patch('http://localhost:3000/recoding_infos/'+this.recoId, {
            name: name,
            ip_address: ip_address,
            vendor: vendor
            })
            .then((res) => {
            this.RecoInfos.push(res.data);
            this.name = '',
            this.ip_address = '',
            this.vendor = '';
            })
        }
    },
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
