<template>
  <transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3> CCTV 등록</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body1">
              <h4><strong> CCTV 정보</strong></h4>
              <span> 이름 </span><input type="text" v-model="name" placeholder="CCTV 이름 입력"><br/>
              <input type="checkbox" v-model="check1"><span> 사용 </span><br/>
              <input type="checkbox" v-model="check2"><span> 이벤트 전송</span><br/>
              <input type="checkbox" v-model="check3"><span> 비상벨</span><br/>
              <span> 설명 </span><input type="text" v-model="comment" placeholder="CCTV 설명 입력"><br/>
              <span> IP 주소 </span><input type="text" v-model="ip_address" placeholder="CCTV IP 입력"><br/>
              <span> 지역1 </span><input type="text" v-model="area1" placeholder="시/도 입력"><br/>
              <span> 지역2 </span><input type="text" v-model="area2" placeholder="시/군/구 입력"><br/>
              <span> 지역3 </span><input type="text" v-model="area3" placeholder="읍/면/동 입력"><br/>
              <span> 위도 </span><input type="text" v-model="latitude" placeholder="위도 입력"><br/>
              <span> 경도 </span><input type="text" v-model="longitude" placeholder="경도 입력"><br/>
              <span> 제조사 </span><input type="text" v-model="manufacturer" placeholder="제조사 입력"><br/>
              <span> 모델명 </span><input type="text" v-model="model" placeholder="모델명 입력"><br/>
            </slot>

            <slot name="body2">
              <h4><strong> RTSP 정보</strong></h4>
              <span> RTSP Path </span><input type="text" v-model="rtsp_path" placeholder="RTSP Path 입력"><br/>
              <span> RTSP Port </span><input type="text" v-model="rtsp_port" placeholder="RTSP Port 입력"><br/>
              <span> ONVIF Path </span><input type="text" v-model="onvif_profile" placeholder="ONVIF Path 입력"><br/>
              <span> ONVIF Port </span><input type="text" v-model="onvif_port" placeholder="ONVIF Port 입력"><br/>
              <span> 사용자명 </span><input type="text" v-model="username" placeholder="사용자명 입력"><br/>
              <span> 비밀번호 </span><input type="text" v-model="password" placeholder="비밀번호 입력"><br/>
            </slot>

            <slot name="body3">
              <h4><strong> 사용 목적</strong></h4>
              <input type="text" v-model="camera_type" placeholder="사용목적 입력"><br/>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="addCCTVInfo(name, check1, check2, check3, comment, ip_address, area1, area2, area3, latitude, longitude, manufacturer, model, onvif_profile, rtsp_port, onvif_profile, onvif_port, username, password, camera_type), $emit('close')"> 추가 </button>
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
          CCTVInfos: [],
          name: '',
          check1: false,
          check2: false,
          check3: false,
          comment: '',
          ip_address: '',
          area1: '',
          area2: '',
          area3: '',
          latitude: '',
          longitude: '',
          manufacturer: '',
          model: '',
          rtsp_path: '',
          rtsp_port: '',
          onvif_profile: '',
          onvif_port: '',
          username: '',
          password: '',
          camera_type: '',
          manage_port: '',
          forwarded : 0,
          updated_at : "",

          ptz_control_usage: 1,
          alarm: 1,
          emergency_bell: 1,
          control_group: false,
          reporter: '',
          reporter_comment: '',
          health_comment : '',
          user_comment : '',
          group_id: 0
        }
  },
  methods: {
    addCCTVInfo(name, check1, check2, check3, comment, ip_address, area1, area2, area3, latitude, longitude, manufacturer, model, rtsp_path, rtsp_port, onvif_profile, onvif_port, username, password, camera_type) {
      if(check1 == true) {
        this.ptz_control_usage = 1;
      }
      else {
        this.ptz_control_usage = 0;
      }

      if(check2 == true) {
        this.alarm = 1;
      }
      else {
        this.alarm = 0;
      }

      if(check3 == true) {
        this.emergency_bell = 1;
      }
      else {
        this.emergency_bell = 0;
      }
      
      if(name && comment && ip_address && area1 && area2 && area3 && latitude && longitude && manufacturer && model && rtsp_path && rtsp_port && onvif_profile && onvif_port && username && password && camera_type) {
        this.$http.post('http://localhost:3000/cctv_infos', {
          name: name,
          ptz_control_usage: this.ptz_control_usage,
          alarm: this.alarm,
          emergency_bell: this.emergency_bell,
          comment: comment,
          ip_address: ip_address,
          area1: area1,
          area2: area2,
          area3: area3,
          latitude: latitude,
          longitude: longitude,
          manufacturer: manufacturer,
          model: model,
          rtsp_path: rtsp_path,
          rtsp_port: rtsp_port,
          onvif_profile: onvif_profile,
          onvif_port: onvif_port,
          username: username,
          password: password,
          camera_type: camera_type,
          manage_port: this.manage_port,
          forwarded : this.forwarded,
          updated_at : this.updated_at,
          control_group: this.control_group,
          reporter: this.reporter,
          reporter_comment: this.reporter_comment,
          health_comment : this.health_comment,
          user_comment : this.user_comment,
          group_id : this.group_id
        })
        .then((res) => {
          this.CCTVInfos.push(res.data);
          this.CCTVInfos = [],
          this.name = '',
          this.check1 = false,
          this.check2 = false,
          this.check3 = false,
          this.comment = '',
          this.ip_address = '',
          this.area1 = '',
          this.area2 = '',
          this.area3 = '',
          this.latitude = '',
          this.longitude = '',
          this.manufacturer = '',
          this.model = '',
          this.rtsp_path = '',
          this.rtsp_port = '',
          this.onvif_profile = '',
          this.onvif_port = '',
          this.username = '',
          this.password = '',
          this.camera_type = '',
          this.manage_port = '',
          this.forwarded = 0,
          this.updated_at = "",

          this.ptz_control_usage = 0,
          this.alarm = 0,
          this.emergency_bell = 0,
          this.control_group = false,
          this.reporter = '',
          this.reporter_comment = '',
          this.health_comment = '',
          this.user_comment = ''
          this.group_id = 0
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
