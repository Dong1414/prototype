import { createApp, reactive, computed } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 CSS 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import * as Util from './utils/';
import TitleBar from './components/TitleBar.vue';
import FormRow from './components/FormRow.vue';

// 페이지 불러오기
import HomeMainPage from'./pages/HomeMainPage.vue'
import OrderDetailPage from './pages/OrderDetailPage.vue'
import CaleandarDetailPage  from './pages/CaleandarDetailPage.vue'
import MemberLoginPage from './pages/MemberLoginPage.vue'
import MemberJoinPage from './pages/MemberJoinPage.vue'
import MemberDetailPage from './pages/MemberDetailPage.vue'
import MemberCalendarPage  from './pages/MemberCalendarPage.vue'
import MemberOrderListPage  from './pages/MemberOrderListPage.vue'
import AcceptPage  from './pages/AcceptPage.vue'
import MemberHelperJoinPage  from './pages/MemberHelperJoinPage.vue'
import MemberHelperDetailPage  from './pages/MemberHelperDetailPage.vue'





// 전역상태 만들기
const authKey = localStorage.getItem("authKey")
const loginedMemberId = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const loginedMemberName = Util.toStringOrNull(localStorage.getItem("loginedMemberName"))
const loginedMemberNickname = Util.toStringOrNull(localStorage.getItem("loginedMemberNickname"))
const loginedMemberProfileImgUrl = Util.toStringOrNull(localStorage.getItem("loginedMemberProfileImgUrl"))

const globalShare:any = reactive({
  loginedMember:{
    authKey,
    id:loginedMemberId,    
    name:loginedMemberName,
    nicknam:loginedMemberNickname,
    profileImgUrl:loginedMemberProfileImgUrl
  },
  isLogined: computed(() => globalShare.loginedMember.id !== null ),
  logout: () => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("loginedMemberId");
    localStorage.removeItem("loginedMemberName");
    localStorage.removeItem("loginedMemberNickname");
    localStorage.removeItem("loginedMemberProfileImgUrl");
    
    location.replace('/member/login');    
  }
});

// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();

//라우팅 정보 구성
const routes = [
    {
        path: '/',
        component: HomeMainPage,
        props: (route:any) => ({ globalShare })
      },
      {
        path: '/order/list',
        component: MemberOrderListPage,
        props: (route:any) => ({ globalShare })
      },      
      {
        path: '/order/detail',
        component: OrderDetailPage,
        props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
      },
      {
        path: '/accept',
        component: AcceptPage,
        props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
      },      
      {
        path: '/calendar/list',
        component: MemberCalendarPage,
        props: (route:any) => ({ globalShare })
      },
      {
        path: '/calendar/detail',
        component: CaleandarDetailPage,
        props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
      },          
      {
        path: '/member/login',
        component: MemberLoginPage,
        props: (route:any) => ({ globalShare })
      },      
      {
        path: '/member/join',
        component: MemberJoinPage,
        props: (route:any) => ({ globalShare })
      },
      {
        path: '/member/detail',
        component: MemberDetailPage,
        props: (route:any) => ({ globalShare })
      },
      {
        path: '/member/helperJoin',
        component: MemberHelperJoinPage,
        props: (route:any) => ({ globalShare })
      },
      {
        path: '/member/helperDetail',
        component: MemberHelperDetailPage,
        props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
      }
      
      

      
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 앱 생성
const app = createApp(App, {
  globalShare
});

// 전력 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;

//전역 컴포넌트 등록
app.component('TitleBar', TitleBar);
app.component('FormRow', FormRow);

// 앱에 라우터 적용
app.use(router)

// 앱 표시
app.mount('#app')
