<template>
  <TitleBar>로그인</TitleBar>

  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined == false" v-on:submit.prevent="checkAndJoin">
          <FormRow title="로그인아이디">
            <input ref="loginIdElRef" class="form-row-input" type="text" placeholder="아이디를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인비밀번호">
            <input ref="loginPwElRef" class="form-row-input" type="password" placeholder="로그인비밀번호를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인비밀번호확인">
            <input ref="loginPwConfirmElRef" class="form-row-input" type="password" placeholder="로그인비밀번호확인을 입력해주세요.">
          </FormRow>
          <FormRow title="프로필 이미지">
            <input ref="profileImgElRef" class="form-row-input" type="file" placeholder="프로필이미지를 선택해주세요.">
          </FormRow>
          <FormRow title="이름">
            <input ref="nameElRef" class="form-row-input" type="text" placeholder="이름을 입력해주세요.">
          </FormRow>
          <FormRow title="닉네임">
            <input ref="nicknameElRef" class="form-row-input" type="text" placeholder="닉네임을 입력해주세요.">
          </FormRow>
          <FormRow title="전화번호">
            <input ref="cellphoneNoElRef" class="form-row-input" type="tel" placeholder="전화번호를 입력해주세요.">
          </FormRow>
          <FormRow title="이메일">
            <input ref="emailElRef" class="form-row-input" type="email" placeholder="이메일을 입력해주세요.">
          </FormRow>
          <FormRow title="활동지역">            
             <select name="sido" id="sido" class="form-row-select" ref="sidoElRef">            
            <option value="1">시/도 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
          </select> 
          </FormRow>
          <FormRow title="자격증">            
            <input ref="certificateElRef1" class="w-1/4 rounded-sm mr-4" type="text" placeholder="자격증을 입력해주세요.">
            <input ref="certificateElRef2" class="w-1/4 rounded-sm" type="text" placeholder="발행처">
          </FormRow>
          <FormRow title="경력">
            <input ref="careerElRef1" class="w-1/4 rounded-sm" type="text" placeholder="2010.4">
            ~ 
            <input ref="careerElRef2" class="w-1/4 rounded-sm" type="text" placeholder="2021.2">
          </FormRow>
          <FormRow title="가입">
            <div class="btns">
              <input type="submit" value="가입" class="btn-primary" />
            </div>
          </FormRow>
        </form>
        <div v-else>
          이미 로그인 되었습니다. <router-link class="btn-link" to="/">홈</router-link> 으로 이동
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis/'
import { Router } from 'vue-router';
export default defineComponent({
  name: 'MemberJoinPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const loginIdElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwConfirmElRef = ref<HTMLInputElement>();
    const profileImgElRef = ref<HTMLInputElement>();
    const nameElRef = ref<HTMLInputElement>();
    const nicknameElRef = ref<HTMLInputElement>();
    const cellphoneNoElRef = ref<HTMLInputElement>();
    const emailElRef = ref<HTMLInputElement>();
    const sidoElRef = ref<HTMLInputElement>();    
    const certificateElRef1 = ref<HTMLInputElement>();
    const certificateElRef2 = ref<HTMLInputElement>();
    const careerElRef1 = ref<HTMLInputElement>();
    const careerElRef2 = ref<HTMLInputElement>();
    

    function checkAndJoin() {     
      // 로그인아이디 체크
      if ( loginIdElRef.value == null ) {
        return;
      }
      const loginIdEl = loginIdElRef.value;
      loginIdEl.value = loginIdEl.value.trim();
      if ( loginIdEl.value.length == 0 ) {
        alert('로그인 아이드를 입력해주세요.');
        loginIdEl.focus();
        return;
      }
      // 로그인비번 체크
      if ( loginPwElRef.value == null ) {
        return;
      }
      const loginPwEl = loginPwElRef.value;
      loginPwEl.value = loginPwEl.value.trim();
      if ( loginPwEl.value.length == 0 ) {
        alert('로그인 비번을 입력해주세요.');
        loginPwEl.focus();
        return;
      }
      // 로그인비번확인 체크
      if ( loginPwConfirmElRef.value == null ) {
        return;
      }
      const loginPwConfirmEl = loginPwConfirmElRef.value;
      if ( loginPwEl.value != loginPwConfirmEl.value ) {
        alert('로그인 비번이 일치하지 않습니다.');
        loginPwConfirmEl.focus();
        return;
      }
      // 이름 체크
      if ( nameElRef.value == null ) {
        return;
      }
      const nameEl = nameElRef.value;
      nameEl.value = nameEl.value.trim();
      if ( nameEl.value.length == 0 ) {
        alert('이름을 입력해주세요.');
        nameEl.focus();
        return;
      }
      // 별명 체크
      if ( nicknameElRef.value == null ) {
        return;
      }
      const nicknameEl = nicknameElRef.value;
      nicknameEl.value = nicknameEl.value.trim();
      if ( nicknameEl.value.length == 0 ) {
        alert('별명을 입력해주세요.');
        nicknameEl.focus();
        return;
      }
      // 휴대전화번호 체크
      if ( cellphoneNoElRef.value == null ) {
        return;
      }
      const cellphoneNoEl = cellphoneNoElRef.value;
      cellphoneNoEl.value = cellphoneNoEl.value.trim();
      if ( cellphoneNoEl.value.length == 0 ) {
        alert('휴대전화번호를 입력해주세요.');
        cellphoneNoEl.focus();
        return;
      }
      // 이메일 체크
      if ( emailElRef.value == null ) {
        return;
      }
      const emailEl = emailElRef.value;
      emailEl.value = emailEl.value.trim();
      if ( emailEl.value.length == 0 ) {
        alert('이메일을 입력해주세요.');
        emailEl.focus();
        return;
      }

      // 활동지역 체크
      if ( sidoElRef.value == null ) {
        return;
      }
      const sidoEl = sidoElRef.value;
      sidoEl.value = sidoEl.value.trim();
      if ( sidoEl.value == '1' ) {
        alert('활동지역을 선택하세요');
        sidoEl.focus();
        return;
      }
      // 자격증 체크
      if ( certificateElRef1.value == null ) {
        return;
      }
      const certificateEl1 = certificateElRef1.value;
      certificateEl1.value = certificateEl1.value.trim();
      if ( certificateEl1.value.length == 0 ) {
        alert('자격증을 입력해주세요');
        certificateEl1.focus();
        return;
      }

      if ( certificateElRef2.value == null ) {
        return;
      }
      const certificateEl2 = certificateElRef2.value;
      certificateEl2.value = certificateEl2.value.trim();
      if ( certificateEl2.value.length == 0 ) {
        alert('발행기관을 입력해주세요');
        certificateEl2.focus();
        return;
      }
      
      // 경력 체크
      if ( careerElRef1.value == null ) {
        return;
      }
      const careerEl1 = careerElRef1.value;
      careerEl1.value = careerEl1.value.trim();
      if ( careerEl1.value.length == 0 ) {
        alert('시작날짜를 입력해주세요');
        careerEl1.focus();
        return;
      }

      if ( careerElRef2.value == null ) {
        return;
      }
      
      const careerEl2 = careerElRef2.value;
      careerEl2.value = careerEl2.value.trim();
      if ( careerEl2.value.length == 0 ) {
        alert('현재날짜를 입력해주세요');
         
        careerEl2.focus();
        return;
      }
      const careerEl = String(careerEl1.value) + ' ~ ' + String(careerEl2.value); 
      
      
      const startJoin = (genFileIdsStr:string) => {
        join(loginIdEl.value, loginPwEl.value, nameEl.value, nicknameEl.value, cellphoneNoEl.value, emailEl.value, genFileIdsStr, sidoEl.value, certificateEl1.value, careerEl);
      };
      const startFileUpload = (onSuccess:Function) => {
        if ( !!!profileImgElRef.value?.files ) {
          onSuccess("");
          return;
        }
        
        mainApi.common_genFile_doUpload(profileImgElRef.value?.files[0])
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              onSuccess(axiosResponse.data.body.genFileIdsStr);
            }
          });
      };
      startFileUpload(startJoin);
    }
    function join(loginId:string, loginPw:string, name:string, nickname:string, cellphoneNo:string, email:string, genFileIdsStr:string, sidoEl:string, certificateEl:string, careerEl:string) {
      mainApi.member_doExpertJoin(loginId, loginPw, name, nickname, cellphoneNo, email, genFileIdsStr, sidoEl, certificateEl, careerEl)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          router.replace('/member/login?loginId=' + loginId)
        });
    }
    return {
      checkAndJoin,
      loginIdElRef,
      loginPwElRef,
      loginPwConfirmElRef,
      profileImgElRef,
      nameElRef,
      nicknameElRef,
      cellphoneNoElRef,
      emailElRef,
      sidoElRef,
      certificateElRef1,
      certificateElRef2,      
      careerElRef1,
      careerElRef2      
    }
  }
})
</script>

<style scoped>
</style> 