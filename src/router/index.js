import Vue from 'vue'
import Router from 'vue-router'

// 로그인 페이지
import Login from '../components/common/Login'
// 기본 랜딩페이지
import Landing from '../components/Landing'

// 녹화장치 관리
import RecoinfoForm from '../components/board/device/RecoinfoForm'

import CCTVInfoForm from "../components/board/camera/CCTVInfoForm"
import CCTVGroupForm from "../components/board/camera/CCTVGroupForm"
import ControlGroupForm from "../components/board/camera/ControlGroupForm"
import RTSPInfoForm from '../components/board/camera/RTSPInfoForm.vue'
import FixReportForm from '../components/board/camera/FixReportForm.vue'
import CameraHealthForm from '../components/board/camera/CameraHealthForm.vue'

// 사용자관리->사용자 정보
import UserInfo from '../components/board/userManagement/UserInfo'

// 통계 -> 처리현황, 시간별, 지역별, (고장리포트 통계),리포트설정
import ProceStatus from '../components/board/statistics/ProceStatus'
import HourlyStatistics from '../components/board/statistics/HourlyStatistics'
import RegionalStatistics from '../components/board/statistics/RegionalStatistics'

import ReportSetting from '../components/board/statistics/ReportSetting'

// 로그 -> 이벤트 로그, 시스템 로그
import EventLog from '../components/board/logManagement/EventLog'
import SystemLog from '../components/board/logManagement/SystemLog'





Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/'
			,name:Login
			,component:Login
		},
    		// 랜딩페이지
		{
			path:'/main'
			,name:Landing
			,component:Landing
		},
    // 정수 추가
    { // 1-1.녹화장치 정보
      path: '/RecoinfoForm',
      name: 'RecoinfoForm',
      component: RecoinfoForm
    },
    // 녹화장치 진단

    { // 2-1 CCTV 등록
      path: '/CCTVInfoForm',
      name: 'CCTVInfoForm',
      component: CCTVInfoForm
    },
    { // 2-2 CCTV 그룹
      path: '/CCTVGroupForm',
      name: 'CCTVGroupForm',
      component: CCTVGroupForm
    }, 
    { // 2-3 집중관제 그룹
      path: '/ControlGroupForm',
      name: 'ControlGroupForm',
      component: ControlGroupForm
    },
    {  // 2-4 RTSP 정보
      path: '/RTSPInfoForm',
      name: 'RTSPInfoForm',
      component: RTSPInfoForm
    },
    { // 2-5 고장 리포트
      path: '/FixReportForm',
      name: 'FixReportForm',
      component: FixReportForm
    },    
    { // 2-6 카메라 상태 확인
      path: '/CameraHealthForm',
      name: 'CameraHealthForm',
      component: CameraHealthForm
    },

    // 사용자관리
    { // 3-1 사용자 정보
      path: '/userinfo',
      name: UserInfo,
      component: UserInfo
    },

    // 통계
    { // 5-1 처리현황 통계
      path: '/procestatus',
      name: ProceStatus,
      component: ProceStatus
    },
    { // 5-2 객체 종류 시간별 통계
      path: '/hourlystatistics',
      name: HourlyStatistics,
      component: HourlyStatistics
    },
    { // 5-3 객체 종류 지역별 통계
      path: '/regionalstatistics',
      name: RegionalStatistics,
      component: RegionalStatistics
    },

    { // 5-5 고장 리포트 설정
      path: '/reportsetting',
      name: ReportSetting,
      component: ReportSetting
    },

    // 6 로그
    { // 6-1 이벤트로그
      path:'/eventlog',
      name: EventLog,
      component: EventLog
    },

    { // 6-2 시스템 로그
      path: '/systemlog',
      name: SystemLog,
      component: SystemLog
    },  

   
  ]
})
