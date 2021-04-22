<template>
	<div id="sidebar">
      <div id="infomation">
        <div class="profile-wrapper">
          <div class="profile">
            <!-- image 추가되야함 -->
          </div>
          <div class="userinfo-wrapper">
            <span class="name">EventAdmin</span>
            <span class="role">관리자</span>
          </div>
        </div>
        <div class="logout-wrapper">
          <router-link to="/">
            <button class="logout-btn"><span class="logout-text">로그아웃</span></button>
          </router-link>
        </div>
      </div>
      <ul class="menuWrap">
        <li id="device-li" @click.prevent="toggle1()">녹화장치 관리</li>
          <ul id="inner-ul" v-if="list1">
            <li class="inner-li"><a><router-link to="/RecoinfoForm">녹화장치 정보</router-link></a></li>
          </ul>

        <li id="camera-li" @click.prevent="toggle2()">카메라 관리</li>
          <ul id="inner-ul" v-if="list2">
            <li class="inner-li"><a><router-link to="/CCTVInfoForm">CCTV 등록</router-link></a></li>
            <li class="inner-li"><a><router-link to="/CCTVGroupForm">CCTV 그룹</router-link></a></li>
            <li class="inner-li"><a><router-link to="/ControlGroupForm">집중관제 그룹</router-link></a></li>
            <li class="inner-li"><a><router-link to="/RTSPInfoForm">RTSP 정보</router-link></a></li>
            <li class="inner-li"><a><router-link to="/FixReportForm">고장 리포트</router-link></a></li>
            <li class="inner-li"><a><router-link to="/CameraHealthForm">카메라 상태 확인</router-link></a></li>
          </ul>

        <li id="user-li" @click.prevent="toggle3()" style="background-color: #4777d4">사용자 관리</li>
          <ul id="inner-ul" v-if="list3">
            <li class="inner-li"><a><router-link to="/userinfo">사용자 정보</router-link></a></li>
          </ul>

        <li id="event-li" @click.prevent="toggle4()">이벤트 관리</li>
          <ul id="inner-ul" v-if="list4">
            <li class="inner-li"><a><router-link to="/EventSetting">이벤트 설정</router-link></a></li>
          </ul>

        <li id="statistics-li" @click.prevent="toggle5()">통계</li>
          <ul id="inner-ul" v-if="list5">
            <li class="inner-li"><a><router-link to="/procestatus">처리 현황</router-link></a></li>
            <li class="inner-li"><a><router-link to="/hourlystatistics">객체종류 시간별 통계</router-link></a></li>
            <li class="inner-li"><a><router-link to="/regionalstatistics">객체종류 지역별 통계</router-link></a></li>
            <li class="inner-li"><a><router-link to="/ReportStatus">고장 리포트 통계</router-link></a></li>
            <li class="inner-li"><a><router-link to="/ReportSetting">리포트 설정</router-link></a></li>
          </ul>

        <li id="log-li" @click.prevent="toggle6()">로그</li>
          <ul id="inner-ul" v-if="list6">
            <li class="inner-li"><a><router-link to="/eventlog">이벤트 로그</router-link></a></li>
            <li class="inner-li"><a><router-link to="/systemlog">시스템 로그</router-link></a></li>
          </ul>

        <li id="system-li" @click.prevent="toggle7()">시스템 관리</li>
          <ul id="inner-ul" v-if="list7">
            <li class="inner-li"><a><router-link to="/SystemInfo">시스템 정보</router-link></a></li>
          </ul>
		  </ul>
	</div>
</template>
<script>
export default {
	name: 'Board',
  data(){
        return {
          list1:false,
          list2:false,
          list3:false,
          list4:false,
          list5:false,
          list6:false,
          list7:false,
        }
    },
  methods : {
    toggle1() {
      this.list1 = !this.list1;
    },
    toggle2() {
      this.list2 = !this.list2;
    },
    toggle3() {
      this.list3 = !this.list3;
    },
    toggle4() {
      this.list4 = !this.list4;
    },
    toggle5() {
      this.list5 = !this.list5;
    },
    toggle6() {
      this.list6 = !this.list6;
    },
    toggle7() {
      this.list7 = !this.list7;
    }
  }
}

</script>

<style scoped>
/* # => id 선택자, . => 클래스 선택자*/
                                  /*https://webclub.tistory.com/356 vh란?*/
#sidebar{
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #2a3144;
  opacity: 75%;
  width: 260px;
  height:100%;
  float: left;
}
#infomation{
  height: 120px;
  display: block;
}
.menuWrap {
  float: left;
  color: #ffffff;
  width: 100%;
}
#inner-ul {
  list-style: none;
  display: inline;
}
.inner-li {
  font-size : 14px;
  letter-spacing: -1px;
  line-height: 22px;
  height: 30px;
}
ul {
  padding-left: 0px;
  list-style: none;
}
li {
  cursor: pointer;
  height: 41px;
  /* margin-left: 30px; */
  font-size: 16px;
  letter-spacing: -1px;
  line-height: 41px;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 25px;
  text-indent: 40px;
  /* float: left; */
}
#device-li {
  background-image: url("../../assets/list2.png");
}
#camera-li {
  background-image: url("../../assets/camera.png");
}
#user-li {
  background-image: url("../../assets/user.png");
}
#event-li {
  background-image: url("../../assets/table.png");
}
#statistics-li {
  background-image: url("../../assets/piechart.png");
}
#log-li {
  background-image: url("../../assets/list.png");
}
#system-li {
  background-image: url("../../assets/setting.png");
}
.profile-wrapper {
  height: 50px;
  padding-top: 30px;
}
.profile {
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 16px;
  background-color: #858994;
  border: 1px solid #4777d4;
  margin-left: 30px;
  margin-top: 5px;
}
.userinfo-wrapper {
  margin-left: 80px;
}
.name {
  font-size: 14px;
  letter-spacing: 0px;
  display: block;
  color: #ffffff;
}
.role {
  font-size: 13px;
  letter-spacing: -1px;
  color: #a0a8c0;
  display: block;
  font-weight: 300;
}
.logout-wrapper {
  height: 30px;
  text-align: right;
}
.logout-btn {
  width: 60px;
  height: 25px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #ffffff;
  margin-right: 15px;
}
.logout-text {
  text-align: center;
  font-size: 12px;
  letter-spacing: -1px;
  color: #ffffff;
}

.png {
  width: 25px;
  height: 25px;
  margin-left: 30px;
  object-fit: cover;
  background-color: white;
  margin-top: 5px;
  }
.menu-text {
  margin: 5px;
  padding-left : 10px;
  display: inline-block;
}

a {
  text-decoration:none;
  color: #858994;
}
a:visited {
  text-decoration:none;
}
a:hover {
  text-decoration: none;
}
a:focus {
  text-decoration: none;
}
a:hover, a:active {
  text-decoration: none;
}
</style>
