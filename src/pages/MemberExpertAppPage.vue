<template>
 <TitleBar>장례지도사 등록</TitleBar>

 <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndJoin">
          <FormRow title="활동지역">
            <input ref="placesElRef" class="form-row-input" type="text" placeholder="활동지역을 입력해주세요.">
          </FormRow>
          <FormRow title="자격증">
            <input ref="certificateElRef" class="form-row-input" type="password" placeholder="자격증을 입력해주세요.">
          </FormRow>
          <FormRow title="경력">
            <input ref="careerElRef" class="form-row-input" type="password" placeholder="경력을 입력해주세요.">
          </FormRow>          
          <FormRow title="등록">
            <div class="btns">
              <input type="submit" value="신청" class="btn-primary" />
            </div>
          </FormRow>
        </form>
        <div v-else>
          <router-link class="btn-link" to="/">로그인</router-link>후 이용해주세요.
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
  name: 'MemberExpertAppPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const placesElRef = ref<HTMLInputElement>();
    const certificateElRef = ref<HTMLInputElement>();
    const careerElRef = ref<HTMLInputElement>();    
  }
})
</script>

<style>

</style>